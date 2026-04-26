"use client";

import KoshkSection from "./KoshkSection";

interface DailyJokeProps {
  joke: string;
}

export default function DailyJoke({ joke }: DailyJokeProps) {
  return (
    <KoshkSection
      title="نكتة الكشك"
      icon="😂"
      color="#E8751A"
      delay={200}
    >
      <p className="text-base sm:text-lg leading-relaxed text-[var(--color-koshk-brown)] whitespace-pre-line">
        {joke}
      </p>
    </KoshkSection>
  );
}
