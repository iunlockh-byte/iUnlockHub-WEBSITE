-- SQL to create the reviews table in Supabase

create table public.reviews (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  comment text not null,
  service_type text -- optional, to filter by service
);

-- Row Level Security (RLS)
alter table public.reviews enable row level security;

-- Policy: Anyone can read reviews
create policy "Reviews are viewable by everyone" 
on public.reviews for select 
using (true);

-- Policy: Only authenticated users can insert reviews
create policy "Authenticated users can insert reviews" 
on public.reviews for insert 
with check (auth.role() = 'authenticated');

-- Policy: Users can only delete their own reviews
create policy "Users can delete their own reviews" 
on public.reviews for delete 
using (auth.uid() = user_id);

-----------------------------------------------------------
-- COMMUNITY SYSTEM
-----------------------------------------------------------

-- 1. POSTS TABLE
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text not null,
  content text not null,
  image_url text, -- link to stored image
  likes_count integer default 0
);

alter table public.posts enable row level security;

create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Authenticated users can insert posts" on public.posts for insert with check (auth.role() = 'authenticated');
create policy "Users can delete their own posts" on public.posts for delete using (auth.uid() = user_id);

-- 2. COMMENTS TABLE
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  user_email text not null,
  content text not null
);

alter table public.comments enable row level security;

create policy "Comments are viewable by everyone" on public.comments for select using (true);
create policy "Authenticated users can insert comments" on public.comments for insert with check (auth.role() = 'authenticated');

-- 3. STORAGE SETUP (Manual Step in Supabase UI)
-- Create a public bucket named 'community'
-- Add policy: "Give users access to upload images"
-- Scope: INSERT, Bucket: 'community', Check: auth.role() = 'authenticated'

-----------------------------------------------------------
-- PERSISTENT ORDERS SYSTEM
-----------------------------------------------------------

create table public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id) on delete set null, -- Optional, can be guest
  customer_email text not null,
  customer_name text not null,
  whatsapp_number text,
  device_model text not null,
  imei text not null,
  service_type text not null,
  amount numeric(10, 2) not null,
  status text default 'Pending' not null,
  payment_method text
);

alter table public.orders enable row level security;

-- Policy: Authenticated users can only see their own orders
create policy "Users can view their own orders" 
on public.orders for select 
using (auth.uid() = user_id);

-- Policy: Anyone can insert an order (supports guest checkouts too)
create policy "Anyone can insert orders" 
on public.orders for insert 
with check (true);
