-- Migração para guardar fotos dos moldes no Supabase Storage
-- Execute no SQL Editor depois de aplicar o schema base.
-- Este script assume que as fotos vivem em public.orders.mold_photos (jsonb), nao numa tabela separada.

insert into storage.buckets (id, name, public)
values ('mold-photos', 'mold-photos', true)
on conflict (id) do update
set name = excluded.name,
    public = excluded.public;

drop policy if exists "mold_photos_select_anon" on storage.objects;
drop policy if exists "mold_photos_insert_anon" on storage.objects;
drop policy if exists "mold_photos_update_anon" on storage.objects;
drop policy if exists "mold_photos_delete_anon" on storage.objects;

create policy "mold_photos_select_anon" on storage.objects
  for select to anon
  using (bucket_id = 'mold-photos');

create policy "mold_photos_insert_anon" on storage.objects
  for insert to anon
  with check (bucket_id = 'mold-photos');

create policy "mold_photos_update_anon" on storage.objects
  for update to anon
  using (bucket_id = 'mold-photos')
  with check (bucket_id = 'mold-photos');

create policy "mold_photos_delete_anon" on storage.objects
  for delete to anon
  using (bucket_id = 'mold-photos');

alter table public.orders
  add column if not exists mold_photos jsonb not null default '[]'::jsonb;

create index if not exists idx_orders_mold_photos_gin
  on public.orders using gin (mold_photos);
