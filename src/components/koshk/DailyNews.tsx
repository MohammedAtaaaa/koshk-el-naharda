"use client";

import KoshkSection from "./KoshkSection";

interface DailyNewsProps {
  news: string;
}

export default function DailyNews({ news }: DailyNewsProps) {
  return (
    <KoshkSection
      title="خبر الكشك"
      icon="📰"
      color="#C0392B"
      delay={100}
    >
      <p className="text-base sm:text-lg leading-relaxed text-[var(--color-koshk-brown)]">
        {news}
      </p>
    </KoshkSection>
  );
}
