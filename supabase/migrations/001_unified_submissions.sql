-- Unified lead / form submission log for Socialsect
-- Run in Supabase: SQL Editor → New query → paste → Run

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  form_type text not null,
  endpoint text not null,

  source_page_url text,
  source_page_path text,
  source_page_host text,

  submitter_name text,
  submitter_email text,
  practice_name text,

  specialty text,
  practice_location text,
  locations_count text,
  marketing_status text,
  challenge_text text,
  referral_source text,
  note text,

  newsletter_placement text,
  resource_title text,
  resource_type text,

  reference_client text,
  reference_case_meta text,
  page_specialty text,
  page_slug text,

  team_email_sent boolean not null default true,
  visitor_email_sent boolean not null default false,
  team_email_id text,

  user_agent text,
  environment text,

  payload jsonb not null default '{}'::jsonb
);

comment on table public.submissions is 'All website form submissions (book a call, reference, resources, newsletter).';

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);

create index if not exists submissions_form_type_idx
  on public.submissions (form_type);

create index if not exists submissions_source_page_path_idx
  on public.submissions (source_page_path);

create index if not exists submissions_submitter_email_idx
  on public.submissions (submitter_email);

alter table public.submissions enable row level security;

-- No policies: only the service_role key (server) can insert/read.
-- View and export data in the Supabase dashboard or with the service role.
