"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { getCairoDateFormatted } from "@/lib/date-utils";
import { Newspaper, Send, Heart, LogIn } from "lucide-react";

const emptySubscribe = () => () => {};

export default function KoshkHeader() {
  const arabicDate = useSyncExternalStore(
    emptySubscribe,
    () => getCairoDateFormatted(),
    () => ""
  );

  return (
    <header className="relative overflow-hidden">
      {/* Wooden top bar */}
      <div className="bg-gradient-to-b from-[var(--color-koshk-wood)] to-[var(--color-koshk-wood-dark)] py-3 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-3">
            <Link
              href="/submit"
              className="flex items-center gap-1.5 text-sm text-[var(--color-koshk-cream)] hover:text-[var(--color-koshk-yellow)] transition-colors"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">ارمي في الكشك</span>
            </Link>
            <Link
              href="/feed"
              className="flex items-center gap-1.5 text-sm text-[var(--color-koshk-cream)] hover:text-[var(--color-koshk-yellow)] transition-colors"
            >
              <Newspaper className="w-4 h-4" />
              <span className="hidden sm:inline">آخر اللي اترمي</span>
            </Link>
            <Link
              href="/saved"
              className="flex items-center gap-1.5 text-sm text-[var(--color-koshk-cream)] hover:text-[var(--color-koshk-yellow)] transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">كشكي الخاص</span>
            </Link>
          </nav>
          <Link
            href="/login"
            className="flex items-center gap-1.5 text-sm text-[var(--color-koshk-cream)] hover:text-[var(--color-koshk-yellow)] transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span className="hidden sm:inline">دخول</span>
          </Link>
        </div>
      </div>

      {/* Main header area */}
      <div className="koshk-grain bg-gradient-to-b from-[var(--color-koshk-paper)] to-[var(--color-koshk-cream)] border-b-4 border-[var(--color-koshk-wood)]">
        <div className="max-w-4xl mx-auto py-8 px-4 text-center relative z-10">
          {/* Koshk sign */}
          <div className="koshk-swing inline-block mb-4">
            <div className="bg-[var(--color-koshk-wood)] text-[var(--color-koshk-cream)] px-8 py-3 rounded-lg shadow-lg border-2 border-[var(--color-koshk-wood-dark)]">
              <h1
                className="text-4xl sm:text-5xl font-black"
                style={{ fontFamily: "var(--font-amiri)" }}
              >
                كشك النهاردة
              </h1>
            </div>
          </div>

          {/* Date + open status */}
          <div className="flex items-center justify-center gap-3 text-[var(--color-koshk-brown)]">
            <span className="text-sm sm:text-base">{arabicDate}</span>
            <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full border border-green-300">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              مفتوح دلوقتي
            </span>
          </div>

          {/* Subtitle */}
          <p className="mt-3 text-[var(--color-koshk-brown)]/70 text-sm">
            كشكك الرقمي المصري — أخبار، نكت، أمثال، وميمز كل يوم الصبح
          </p>
        </div>
      </div>
    </header>
  );
}
