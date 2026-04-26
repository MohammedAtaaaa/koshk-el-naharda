"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import KoshkHeader from "@/components/koshk/KoshkHeader";
import KoshkFooter from "@/components/koshk/KoshkFooter";
import KoshkSection from "@/components/koshk/KoshkSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SUBMISSION_TYPES } from "@/lib/types";
import type { Submission } from "@/lib/types";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function SubmitPage() {
  const router = useRouter();
  const [type, setType] = useState<Submission["type"]>("نكتة");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const typeEmojis: Record<Submission["type"], string> = {
    "نكتة": "😂",
    "ميم": "🖼️",
    "خبر محلي": "📰",
    "مثل شعبي": "📜",
    "صورة من الشارع": "📸",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("اكتب حاجة الأول يا صديقي!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content, anonymous }),
      });

      if (!res.ok) throw new Error("فشل الإرسال");

      setSubmitted(true);
      toast.success("تم الإرسال! هنراجعه وننزله في الكشك 🎉");
      setTimeout(() => router.push("/"), 2000);
    } catch {
      toast.error("حصلت مشكلة... جرب تاني");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <KoshkHeader />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center animate-fade-in-up">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2
              className="text-2xl font-bold text-[var(--color-koshk-brown)] mb-2"
              style={{ fontFamily: "var(--font-amiri)" }}
            >
              تم الإرسال بنجاح!
            </h2>
            <p className="text-[var(--color-koshk-brown)]/70">
              هنراجع اللي بعته وننزله في الكشك إن شاء الله 🎉
            </p>
          </div>
        </main>
        <KoshkFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <KoshkHeader />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <KoshkSection title="ارمي في الكشك" icon="📦" color="#E8751A">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Type selector */}
            <div>
              <Label className="text-[var(--color-koshk-brown)] font-semibold mb-2 block">
                نوع المحتوى
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SUBMISSION_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      type === t
                        ? "bg-[var(--color-koshk-orange)] text-white shadow-md scale-105"
                        : "bg-[var(--color-koshk-cream)] text-[var(--color-koshk-brown)] hover:bg-[var(--color-koshk-yellow)]/30 border border-[var(--color-koshk-wood)]/20"
                    }`}
                  >
                    <span>{typeEmojis[t]}</span>
                    <span>{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <Label
                htmlFor="content"
                className="text-[var(--color-koshk-brown)] font-semibold mb-2 block"
              >
                اكتب اللي عندك
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب نكتة، خبر، مثل شعبي... أي حاجة تحب ترميها في الكشك!"
                className="min-h-[120px] bg-white/50 border-[var(--color-koshk-wood)]/30 text-[var(--color-koshk-brown)] placeholder:text-[var(--color-koshk-brown)]/40 text-base"
                dir="rtl"
              />
            </div>

            {/* Anonymous toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="w-4 h-4 rounded accent-[var(--color-koshk-orange)]"
              />
              <span className="text-sm text-[var(--color-koshk-brown)]">
                انشر بدون اسم (مجهول)
              </span>
            </label>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--color-koshk-orange)] hover:bg-[var(--color-koshk-red)] text-white font-bold py-3 text-base"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  بنبعت...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  ارمي في الكشك
                </span>
              )}
            </Button>
          </form>
        </KoshkSection>
      </main>

      <KoshkFooter />
    </div>
  );
}
