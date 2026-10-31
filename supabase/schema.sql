-- =========================================================
-- TIME TRACE - SUPABASE SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- =========================================================

-- 1. TABEL LEADERBOARD (Papan Peringkat Pemain Global)
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nickname TEXT NOT NULL,
    score INTEGER NOT NULL,
    cases_solved INTEGER DEFAULT 1,
    accuracy_pct INTEGER DEFAULT 0,
    avatar TEXT DEFAULT '🕵️',
    country TEXT DEFAULT 'ID',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk query leaderboard tercepat (Top 10 / Top 50)
CREATE INDEX IF NOT EXISTS idx_leaderboard_score_created 
ON public.leaderboard (score DESC, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang (anonim & publik) bisa membaca leaderboard
CREATE POLICY "Allow public read on leaderboard" 
ON public.leaderboard 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- Policy: Semua pemain bisa memasukkan skor baru
CREATE POLICY "Allow public insert on leaderboard" 
ON public.leaderboard 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);


-- 2. TABEL VIP WAITLIST (Penampung Kontak Peminat VIP Pass)
CREATE TABLE IF NOT EXISTS public.vip_waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact TEXT NOT NULL,
    preferred_price TEXT,
    selected_features JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk filter waktu waitlist
CREATE INDEX IF NOT EXISTS idx_vip_waitlist_created 
ON public.vip_waitlist (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.vip_waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: Pemain publik hanya bisa insert (tidak bisa intip data kontak orang lain)
CREATE POLICY "Allow public insert on vip_waitlist" 
ON public.vip_waitlist 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Hanya admin/service_role yang bisa membaca seluruh data waitlist
CREATE POLICY "Allow service_role full access on vip_waitlist" 
ON public.vip_waitlist 
FOR ALL 
TO service_role 
USING (true);
