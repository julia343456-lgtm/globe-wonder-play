create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  website text,
  services text[] not null default '{}',
  budget text,
  message text,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Public can submit (insert only, no read)
create policy "Anyone can submit a contact form"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

-- No public select policy: reads only via service-role on the server
create index contact_submissions_created_at_idx on public.contact_submissions (created_at desc);