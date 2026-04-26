"use client";

import Image from "next/image";
import KoshkSection from "./KoshkSection";

interface DailyMemeProps {
  memeUrl: string | null;
}

export default function DailyMeme({ memeUrl }: DailyMemeProps) {
  return (
    <KoshkSection
      title="ميم النهاردة"
      icon="🖼️"
      color="#8E44AD"
      delay={300}
    >
      {memeUrl ? (
        <div className="relative w-full aspect-square max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-[var(--color-koshk-wood)]/20">
          <Image
            src={memeUrl}
            alt="ميم النهاردة"
            fill
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-[var(--color-koshk-cream)] rounded-lg border-2 border-dashed border-[var(--color-koshk-wood)]/30">
          <div className="text-center">
            <span className="text-5xl block mb-2">🎭</span>
            <p className="text-[var(--color-koshk-brown)]/60 text-sm">
              الميم بتاع النهاردة لسه مجاش... استنى شوية
            </p>
          </div>
        </div>
      )}
    </KoshkSection>
  );
}
