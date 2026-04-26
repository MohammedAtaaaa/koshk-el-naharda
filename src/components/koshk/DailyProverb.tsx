"use client";

import KoshkSection from "./KoshkSection";

interface DailyProverbProps {
  proverb: string;
  explanation: string;
}

export default function DailyProverb({ proverb, explanation }: DailyProverbProps) {
  return (
    <KoshkSection
      title="مثل شعبي"
      icon="📜"
      color="#2C3E50"
      delay={400}
    >
      <blockquote
        className="text-xl sm:text-2xl font-bold text-center text-[var(--color-koshk-brown)] mb-4 leading-relaxed"
        style={{ fontFamily: "var(--font-amiri)" }}
      >
        &ldquo;{proverb}&rdquo;
      </blockquote>
      <div className="bg-[var(--color-koshk-cream)] rounded-lg p-3 border border-[var(--color-koshk-wood)]/20">
        <p className="text-sm text-[var(--color-koshk-brown)]/80 leading-relaxed">
          <span className="font-bold text-[var(--color-koshk-orange)]">
            يعني إيه بالبلدي؟{" "}
          </span>
          {explanation}
        </p>
      </div>
    </KoshkSection>
  );
}
