-- ============================================
-- كشك النهاردة - Supabase Database Schema
-- ============================================

-- Daily koshk content (AI-generated, refreshed at midnight Cairo time)
CREATE TABLE IF NOT EXISTS daily_koshk (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  news TEXT NOT NULL,
  joke TEXT NOT NULL,
  meme_url TEXT,
  proverb TEXT NOT NULL,
  proverb_explanation TEXT NOT NULL,
  ai_report TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- User submissions
CREATE TABLE IF NOT EXISTS submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('نكتة', 'ميم', 'خبر محلي', 'مثل شعبي', 'صورة من الشارع')),
  content TEXT NOT NULL,
  image_url TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous BOOLEAN DEFAULT false,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reactions on submissions
CREATE TABLE IF NOT EXISTS reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('يا راجل', 'صح كلامك', 'برافو', 'ههههه', 'معاك')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved items (favorites) per user
CREATE TABLE IF NOT EXISTS saved_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, submission_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_daily_koshk_date ON daily_koshk(date DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_approved ON submissions(approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_submission ON reactions(submission_id);
CREATE INDEX IF NOT EXISTS idx_saved_items_user ON saved_items(user_id);

-- Row Level Security
ALTER TABLE daily_koshk ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_items ENABLE ROW LEVEL SECURITY;

-- Policies: daily_koshk (public read)
CREATE POLICY "daily_koshk_select" ON daily_koshk FOR SELECT USING (true);

-- Policies: submissions
CREATE POLICY "submissions_select_approved" ON submissions FOR SELECT USING (approved = true);
CREATE POLICY "submissions_insert" ON submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "submissions_select_own" ON submissions FOR SELECT USING (auth.uid() = user_id);

-- Policies: reactions
CREATE POLICY "reactions_select" ON reactions FOR SELECT USING (true);
CREATE POLICY "reactions_insert" ON reactions FOR INSERT WITH CHECK (true);

-- Policies: saved_items
CREATE POLICY "saved_items_select_own" ON saved_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "saved_items_insert_own" ON saved_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "saved_items_delete_own" ON saved_items FOR DELETE USING (auth.uid() = user_id);

-- Enable realtime for submissions and reactions
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE reactions;

-- Storage bucket for user-uploaded images
INSERT INTO storage.buckets (id, name, public) VALUES ('koshk-images', 'koshk-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "koshk_images_select" ON storage.objects FOR SELECT USING (bucket_id = 'koshk-images');
CREATE POLICY "koshk_images_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'koshk-images');
