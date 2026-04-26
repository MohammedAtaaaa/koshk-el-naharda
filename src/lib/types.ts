export interface DailyKoshk {
  id: string;
  date: string;
  news: string;
  joke: string;
  meme_url: string | null;
  proverb: string;
  proverb_explanation: string;
  ai_report: string;
  created_at: string;
}

export interface Submission {
  id: string;
  type: "نكتة" | "ميم" | "خبر محلي" | "مثل شعبي" | "صورة من الشارع";
  content: string;
  image_url: string | null;
  user_id: string | null;
  anonymous: boolean;
  approved: boolean;
  created_at: string;
}

export interface Reaction {
  id: string;
  submission_id: string;
  reaction_type: "يا راجل" | "صح كلامك" | "برافو" | "ههههه" | "معاك";
  user_id: string | null;
  created_at: string;
}

export interface SavedItem {
  id: string;
  user_id: string;
  submission_id: string;
  created_at: string;
  submission?: Submission;
}

export const REACTION_EMOJIS: Record<Reaction["reaction_type"], string> = {
  "يا راجل": "😂",
  "صح كلامك": "🔥",
  "برافو": "👏",
  "ههههه": "😭",
  "معاك": "❤️",
};

export const SUBMISSION_TYPES: Submission["type"][] = [
  "نكتة",
  "ميم",
  "خبر محلي",
  "مثل شعبي",
  "صورة من الشارع",
];
