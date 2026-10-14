-- Recibos de vencimento: metadados + bucket privado de PDFs.
-- Execute este ficheiro no SQL Editor do projeto Supabase.
-- A aplicação atual usa autenticação própria no browser; por isso as políticas
-- permitem ao cliente público gerir recibos. Para segurança forte por utilizador,
-- migre futuramente o login para Supabase Auth e restrinja estas políticas por auth.uid().

create table if not exists public.payslips (
  id text primary key,
  user_id text not null,
  period text not null check (period ~ '^\d{4}-(0[1-9]|1[0-2])$'),
  file_name text not null,
  storage_path text not null unique,
  file_size bigint not null default 0 check (file_size >= 0 and file_size <= 10485760),
  uploaded_by text not null default '',
  uploaded_at timestamptz not null default now(),
  sent_at timestamptz,
  sent_by text not null default ''
);

create index if not exists idx_payslips_user_period
  on public.payslips (user_id, period desc, uploaded_at desc);

alter table public.payslips enable row level security;

drop policy if exists "payslips_select_app" on public.payslips;
create policy "payslips_select_app"
  on public.payslips for select
  to anon, authenticated
  using (true);

drop policy if exists "payslips_insert_app" on public.payslips;
create policy "payslips_insert_app"
  on public.payslips for insert
  to anon, authenticated
  with check (true);

drop policy if exists "payslips_update_app" on public.payslips;
create policy "payslips_update_app"
  on public.payslips for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "payslips_delete_app" on public.payslips;
create policy "payslips_delete_app"
  on public.payslips for delete
  to anon, authenticated
  using (true);

grant select, insert, update, delete on public.payslips to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('payslips', 'payslips', false, 10485760, array['application/pdf'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "payslips_storage_select_app" on storage.objects;
create policy "payslips_storage_select_app"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'payslips');

drop policy if exists "payslips_storage_insert_app" on storage.objects;
create policy "payslips_storage_insert_app"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'payslips'
    and lower(storage.extension(name)) = 'pdf'
  );

drop policy if exists "payslips_storage_delete_app" on storage.objects;
create policy "payslips_storage_delete_app"
  on storage.objects for delete
  to anon, authenticated
  using (bucket_id = 'payslips');

do $$
begin
  if exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) and not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'payslips'
  ) then
    alter publication supabase_realtime add table public.payslips;
  end if;
end $$;
