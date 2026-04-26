import KoshkHeader from "@/components/koshk/KoshkHeader";
import KoshkFooter from "@/components/koshk/KoshkFooter";
import DailyNews from "@/components/koshk/DailyNews";
import DailyJoke from "@/components/koshk/DailyJoke";
import DailyMeme from "@/components/koshk/DailyMeme";
import DailyProverb from "@/components/koshk/DailyProverb";
import DailyReport from "@/components/koshk/DailyReport";
import { PLACEHOLDER_KOSHK } from "@/lib/placeholder-data";
import { getCairoDate } from "@/lib/date-utils";

async function getDailyKoshk() {
  try {
    const { createServerSupabaseClient } = await import(
      "@/lib/supabase/server"
    );
    const supabase = await createServerSupabaseClient();
    const today = getCairoDate();

    const { data } = await supabase
      .from("daily_koshk")
      .select("*")
      .eq("date", today)
      .single();

    if (data) return data;
  } catch {
    // Supabase not configured — use placeholder
  }
  return PLACEHOLDER_KOSHK;
}

export default async function HomePage() {
  const koshk = await getDailyKoshk();

  return (
    <div className="flex flex-col min-h-screen">
      <KoshkHeader />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="grid gap-6">
          <DailyNews news={koshk.news} />

          <div className="grid sm:grid-cols-2 gap-6">
            <DailyJoke joke={koshk.joke} />
            <DailyMeme memeUrl={koshk.meme_url} />
          </div>

          <DailyProverb
            proverb={koshk.proverb}
            explanation={
              koshk.proverb_explanation ??
              "المثل ده قديم أوي وكل واحد فاهمه على كيفه!"
            }
          />

          <DailyReport report={koshk.ai_report} />
        </div>
      </main>

      <KoshkFooter />
    </div>
  );
}
