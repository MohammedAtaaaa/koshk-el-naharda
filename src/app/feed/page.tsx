"use client";

import { useState, useEffect } from "react";
import KoshkHeader from "@/components/koshk/KoshkHeader";
import KoshkFooter from "@/components/koshk/KoshkFooter";
import KoshkSection from "@/components/koshk/KoshkSection";
import { REACTION_EMOJIS } from "@/lib/types";
import type { Submission, Reaction } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

const PLACEHOLDER_SUBMISSIONS: Submission[] = [
  {
    id: "1",
    type: "نكتة",
    content:
      "واحد راح يشتري عربية مستعملة، قال للبياع: دي عملت كام كيلو؟ البياع قاله: اللي عداد الكيلومترات واقف عنده ده 😅",
    image_url: null,
    user_id: null,
    anonymous: true,
    approved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    type: "مثل شعبي",
    content: "اللي يحسب الحسابات في الهنا يبات",
    image_url: null,
    user_id: null,
    anonymous: false,
    approved: true,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "3",
    type: "خبر محلي",
    content:
      "في حارتنا واحد فتح محل فلافل جنب محل فلافل تاني... الاتنين اتفقوا يعملوا عرض 'فلافل × ٢' والحارة كلها مبسوطة 😂🧆",
    image_url: null,
    user_id: null,
    anonymous: true,
    approved: true,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
];

export default function FeedPage() {
  const [submissions, setSubmissions] =
    useState<Submission[]>(PLACEHOLDER_SUBMISSIONS);
  const [reactions, setReactions] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/api/submissions")
      .then((res) => res.ok ? res.json() : [])
      .then((data) => {
        if (!cancelled && data.length > 0) setSubmissions(data);
      })
      .catch(() => {});

    let channel: ReturnType<ReturnType<typeof createClient>["channel"]> | undefined;
    let supabaseClient: ReturnType<typeof createClient> | undefined;
    try {
      supabaseClient = createClient();
      channel = supabaseClient
        .channel("feed-realtime")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "submissions", filter: "approved=eq.true" },
          (payload) => {
            setSubmissions((prev) => [payload.new as Submission, ...prev]);
          }
        )
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "reactions" },
          (payload) => {
            const reaction = payload.new as Reaction;
            setReactions((prev) => ({
              ...prev,
              [reaction.submission_id]: {
                ...(prev[reaction.submission_id] || {}),
                [reaction.reaction_type]:
                  ((prev[reaction.submission_id] || {})[reaction.reaction_type] || 0) + 1,
              },
            }));
          }
        )
        .subscribe();
    } catch {
      // Supabase not configured
    }

    return () => {
      cancelled = true;
      if (channel && supabaseClient) {
        supabaseClient.removeChannel(channel);
      }
    };
  }, []);

  async function handleReaction(submissionId: string, reactionType: string) {
    setReactions((prev) => ({
      ...prev,
      [submissionId]: {
        ...(prev[submissionId] || {}),
        [reactionType]:
          ((prev[submissionId] || {})[reactionType] || 0) + 1,
      },
    }));

    try {
      await fetch("/api/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submission_id: submissionId,
          reaction_type: reactionType,
        }),
      });
    } catch {
      // Optimistic update already done
    }
  }

  async function handleSave(submissionId: string) {
    try {
      const res = await fetch("/api/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission_id: submissionId }),
      });

      if (res.status === 401) {
        toast.error("سجل دخول الأول عشان تحفظ!");
        return;
      }

      toast.success("تم الحفظ في كشكك الخاص!");
    } catch {
      toast.error("مش قادر أحفظ... جرب تاني");
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
        <KoshkSection title="آخر اللي اترمي" icon="🔥" color="#C0392B">
          <div className="space-y-4">
            {submissions.map((sub, index) => (
              <div
                key={sub.id}
                className="bg-white/60 rounded-lg p-4 border border-[var(--color-koshk-wood)]/15 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Type badge + time */}
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="secondary"
                    className="bg-[var(--color-koshk-cream)] text-[var(--color-koshk-brown)] border-[var(--color-koshk-wood)]/20"
                  >
                    {typeEmojis[sub.type]} {sub.type}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSave(sub.id)}
                      className="text-[var(--color-koshk-brown)]/40 hover:text-[var(--color-koshk-orange)] transition-colors"
                      title="احفظ في كشكك"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[var(--color-koshk-brown)]/40">
                      {sub.anonymous ? "مجهول" : "زبون الكشك"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <p className="text-[var(--color-koshk-brown)] leading-relaxed whitespace-pre-line mb-3">
                  {sub.content}
                </p>

                {/* Reactions */}
                <div className="flex flex-wrap gap-2">
                  {(
                    Object.entries(REACTION_EMOJIS) as [
                      Reaction["reaction_type"],
                      string,
                    ][]
                  ).map(([type, emoji]) => {
                    const count =
                      (reactions[sub.id] || {})[type] || 0;
                    return (
                      <button
                        key={type}
                        onClick={() => handleReaction(sub.id, type)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-[var(--color-koshk-cream)] hover:bg-[var(--color-koshk-yellow)]/30 border border-[var(--color-koshk-wood)]/10 transition-all hover:scale-105 active:scale-95"
                      >
                        <span>{emoji}</span>
                        <span className="text-[var(--color-koshk-brown)]">
                          {type}
                        </span>
                        {count > 0 && (
                          <span className="bg-[var(--color-koshk-orange)] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </KoshkSection>
      </main>

      <KoshkFooter />
    </div>
  );
}
