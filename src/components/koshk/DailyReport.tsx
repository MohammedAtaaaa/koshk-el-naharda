"use client";

import KoshkSection from "./KoshkSection";

interface DailyReportProps {
  report: string;
}

export default function DailyReport({ report }: DailyReportProps) {
  return (
    <KoshkSection
      title="تقرير الكشك"
      icon="🎙️"
      color="#8B6914"
      delay={500}
    >
      <div className="bg-[var(--color-koshk-cream)] rounded-lg p-4 border border-[var(--color-koshk-wood)]/20">
        <p className="text-base sm:text-lg leading-loose text-[var(--color-koshk-brown)] whitespace-pre-line">
          {report}
        </p>
      </div>
      <p className="mt-3 text-xs text-[var(--color-koshk-brown)]/50 text-left">
        — عم حسن، صاحب الكشك
      </p>
    </KoshkSection>
  );
}
