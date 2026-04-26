import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const SYSTEM_PROMPT = `أنت عم حسن، صاحب كشك جرايد وحلويات في حارة مصرية قديمة. بتتكلم بالعامية المصرية بطريقة دافية ومضحكة.

لازم كل كلامك يكون:
- عامية مصرية طبيعية (مش فصحى)
- فيه حس فكاهة مصري أصيل
- دافي وحميمي زي ما بتتكلم مع جيرانك في الحارة
- مفيش ألفاظ خارجة أو محتوى غير لائق`;

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `اعملي محتوى الكشك بتاع النهاردة. رد عليا بJSON بالشكل ده بالظبط (بدون markdown code blocks):
{
  "news": "خبر مصري مثير أو مضحك أو مميز (٢-٣ سطور بالعامية)",
  "joke": "نكتة مصرية جديدة ومضحكة",
  "proverb": "مثل شعبي مصري",
  "proverb_explanation": "شرح المثل بطريقة حديثة ومضحكة بالعامية",
  "ai_report": "تقرير الكشك اليومي — اتكلم عن الجو والأخبار والنصايح كأنك بتتكلم مع الزباين بتوعك في الصبح (٤-٥ سطور)"
}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 1500,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 500 }
      );
    }

    const cleaned = content.replace(/```json\n?|\n?```/g, "").trim();
    const generated = JSON.parse(cleaned);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      const today = new Date().toLocaleDateString("en-CA", {
        timeZone: "Africa/Cairo",
      });

      await supabase.from("daily_koshk").upsert(
        {
          date: today,
          news: generated.news,
          joke: generated.joke,
          meme_url: null,
          proverb: generated.proverb,
          proverb_explanation: generated.proverb_explanation,
          ai_report: generated.ai_report,
        },
        { onConflict: "date" }
      );
    }

    return NextResponse.json({
      success: true,
      data: generated,
    });
  } catch (error) {
    console.error("Error generating daily content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
