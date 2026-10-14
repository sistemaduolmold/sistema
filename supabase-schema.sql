create table if not exists public.duomold_app_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.duomold_app_state enable row level security;

drop policy if exists "duomold_app_state_select" on public.duomold_app_state;
drop policy if exists "duomold_app_state_insert" on public.duomold_app_state;
drop policy if exists "duomold_app_state_update" on public.duomold_app_state;

create policy "duomold_app_state_select"
  on public.duomold_app_state
  for select
  to anon
  using (true);

create policy "duomold_app_state_insert"
  on public.duomold_app_state
  for insert
  to anon
  with check (true);

create policy "duomold_app_state_update"
  on public.duomold_app_state
  for update
  to anon
  using (true)
  with check (true);
