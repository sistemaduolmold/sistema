-- Correcao da tabela de notificacoes para bases de dados que ja tinham
-- executado uma versao antiga do schema de producao.
-- Execute no SQL Editor do Supabase se as notificacoes nao aparecerem.

alter table public.notifications
  add column if not exists target text,
  add column if not exists page text not null default '',
  add column if not exists record_type text not null default '',
  add column if not exists record_id text not null default '',
  add column if not exists is_read boolean not null default false;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'notifications'
      and column_name = 'user_id'
  ) then
    execute 'update public.notifications set target = coalesce(target, ''user:'' || user_id::text) where target is null';
  end if;
end;
$$;

update public.notifications
set target = ''
where target is null;

alter table public.notifications
  alter column target set not null;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'notifications'
      and column_name = 'read'
  ) then
    execute 'update public.notifications set is_read = read where is_read = false';
  end if;
end;
$$;

create index if not exists idx_notifications_target on public.notifications(target);

alter table public.notifications enable row level security;

drop policy if exists "notifications_select_anon" on public.notifications;
drop policy if exists "notifications_insert_anon" on public.notifications;
drop policy if exists "notifications_update_anon" on public.notifications;
drop policy if exists "notifications_delete_anon" on public.notifications;

create policy "notifications_select_anon"
  on public.notifications
  for select
  to anon
  using (true);

create policy "notifications_insert_anon"
  on public.notifications
  for insert
  to anon
  with check (true);

create policy "notifications_update_anon"
  on public.notifications
  for update
  to anon
  using (true)
  with check (true);

create policy "notifications_delete_anon"
  on public.notifications
  for delete
  to anon
  using (true);

alter table public.duomold_app_state
  add column if not exists data jsonb not null default '{}'::jsonb;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'duomold_app_state'
      and column_name = 'payload'
  ) then
    execute 'update public.duomold_app_state set data = payload where data = ''{}''::jsonb and payload is not null';
  end if;
end;
$$;
