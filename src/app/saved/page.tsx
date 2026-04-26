"use client";

import { useState, useEffect } from "react";
import KoshkHeader from "@/components/koshk/KoshkHeader";
import KoshkFooter from "@/components/koshk/KoshkFooter";
import KoshkSection from "@/components/koshk/KoshkSection";
import { Badge } from "@/components/ui/badge";
import { Trash2, Heart } from "lucide-react";
import { toast } from "sonner";
import type { SavedItem } from "@/lib/types";

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/saved")
      .then((res) => {
        if (res.status === 401) {
          if (!cancelled) {
            setIsLoggedIn(false);
            setLoading(false);
          }
          return null;
        }
        return res.ok ? res.json() : [];
      })
      .then((data) => {
        if (!cancelled && data !== null) {
          setSavedItems(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleRemove(submissionId: string) {
    try {
      const res = await fetch(`/api/saved?submission_id=${submissionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSavedItems((prev) =>
          prev.filter((item) => item.submission_id !== submissionId)
        );
        toast.success("تم الحذف من كشكك");
      }
    } catch {
      toast.error("مش قادر أحذف... جرب تاني");
    }
  }

  const typeEmojis: Record<string, string> = {
    "نكتة": "😂",
    "ميم": "🖼️",
    "خبر محلي": "📰",
    "مثل شعبي": "📜",
    "صورة من الشارع": "📸",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <KoshkHeader />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
        <KoshkSection title="كشكي الخاص" icon="❤️" color="#E74C3C">
          {!isLoggedIn ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-[var(--color-koshk-brown)]/20 mx-auto mb-4" />
              <h3
                className="text-xl font-bold text-[var(--color-koshk-brown)] mb-2"
                style={{ fontFamily: "var(--font-amiri)" }}
              >
                سجل دخول الأول
              </h3>
              <p className="text-[var(--color-koshk-brown)]/60 text-sm">
                عشان تحفظ النكت والأمثال المفضلة بتاعتك
              </p>
              <a
                href="/login"
                className="inline-block mt-4 px-6 py-2 bg-[var(--color-koshk-orange)] text-white rounded-lg font-semibold hover:bg-[var(--color-koshk-red)] transition-colors"
              >
                دخول
              </a>
            </div>
          ) : loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-3 border-[var(--color-koshk-orange)]/30 border-t-[var(--color-koshk-orange)] rounded-full animate-spin mx-auto mb-3" />
              <p className="text-[var(--color-koshk-brown)]/60 text-sm">
                بنجيب الحاجات المحفوظة...
              </p>
            </div>
          ) : savedItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-[var(--color-koshk-brown)]/20 mx-auto mb-4" />
              <h3
                className="text-xl font-bold text-[var(--color-koshk-brown)] mb-2"
                style={{ fontFamily: "var(--font-amiri)" }}
              >
                كشكك فاضي
              </h3>
              <p className="text-[var(--color-koshk-brown)]/60 text-sm">
                روح على &quot;آخر اللي اترمي&quot; واحفظ أي حاجة تعجبك!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedItems.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white/60 rounded-lg p-4 border border-[var(--color-koshk-wood)]/15 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    {item.submission && (
                      <Badge
                        variant="secondary"
                        className="bg-[var(--color-koshk-cream)] text-[var(--color-koshk-brown)] border-[var(--color-koshk-wood)]/20"
                      >
                        {typeEmojis[item.submission.type] || "📌"}{" "}
                        {item.submission.type}
                      </Badge>
                    )}
                    <button
                      onClick={() => handleRemove(item.submission_id)}
                      className="text-[var(--color-koshk-brown)]/40 hover:text-red-500 transition-colors"
                      title="شيل من الكشك"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {item.submission && (
                    <p className="text-[var(--color-koshk-brown)] leading-relaxed whitespace-pre-line">
                      {item.submission.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </KoshkSection>
      </main>

      <KoshkFooter />
    </div>
  );
}
