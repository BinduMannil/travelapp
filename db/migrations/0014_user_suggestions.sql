-- Community feature suggestions used by the public Ideas board.

create table if not exists public.user_suggestions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  status text not null default 'Under Review',
  vote_count int not null default 1 check (vote_count >= 0),
  comment_count int not null default 0 check (comment_count >= 0),
  submitted_by text not null default 'Traveler',
  submitted_by_avatar text not null default 'TR',
  submitted_date_label text not null default 'just now',
  roadmap_label text,
  status_detail text not null default 'Reviewing now',
  is_popular boolean not null default false,
  duplicate_of_id uuid references public.user_suggestions(id) on delete set null,
  normalized_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (char_length(trim(title)) >= 4),
  check (char_length(trim(description)) >= 12),
  check (
    category in (
      'Trip Planning',
      'Maps & Navigation',
      'Budget & Payments',
      'Stays & Hotels',
      'Community & Sharing',
      'Alerts & Notifications',
      'Other'
    )
  ),
  check (
    status in (
      'Under Review',
      'Planned',
      'In Progress',
      'Completed',
      'Declined',
      'Duplicate'
    )
  )
);

create index if not exists idx_user_suggestions_rank
  on public.user_suggestions(vote_count desc, created_at desc);

create trigger trg_user_suggestions_updated_at
before update on public.user_suggestions
for each row execute function public.set_updated_at();

create or replace function public.increment_user_suggestion_vote(suggestion_id uuid)
returns void
language sql
as $$
  update public.user_suggestions
  set vote_count = vote_count + 1
  where id = suggestion_id;
$$;

alter table public.user_suggestions enable row level security;

drop policy if exists user_suggestions_select_public
  on public.user_suggestions;
create policy user_suggestions_select_public
  on public.user_suggestions for select
  using (true);

-- Public writes go through the Next.js API so validation, duplicate checks,
-- rate limits, and bot protection can be centralized server-side.
