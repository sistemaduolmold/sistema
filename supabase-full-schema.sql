-- DUOMOLD CRM - Schema completo para Supabase
-- Execute este ficheiro no SQL Editor do Supabase.

create extension if not exists pgcrypto;

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  vat text,
  email text,
  phone text,
  city text,
  sector text,
  address text,
  notes text,
  status text not null default 'Ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies(id) on delete set null,
  name text not null,
  email text not null unique,
  password text,
  phone text,
  role text,
  owner text,
  status text not null default 'Ativo',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  employee_number text unique,
  name text not null,
  email text not null unique,
  password text,
  phone text,
  profile text not null check (profile in ('Admin', 'RH', 'Funcionario')),
  department text,
  position text,
  status text not null default 'Ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references public.clients(id) on delete cascade,
  reference text not null unique,
  title text not null,
  description text,
  status text not null default 'Recebido',
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  due_date date,
  weekly_update text,
  tasks text,
  show_planning_to_client boolean not null default true,
  show_schedule_to_client boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vacations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  days integer not null default 0 check (days >= 0 and days <= 15),
  origin text not null check (origin in ('Admin/RH', 'Funcionario', 'Compensacao de falta')),
  status text not null default 'Pendente' check (status in ('Pendente', 'Aprovado', 'Rejeitado')),
  notes text,
  decided_by text,
  linked_absence_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.absences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  date date not null,
  type text not null default 'Justificada',
  compensate_vacation boolean not null default false,
  compensation_mode text not null default 'Descontar do salário',
  status text not null default 'Pendente' check (status in ('Pendente', 'Aprovado', 'Rejeitado')),
  reason text,
  decided_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vacations
  drop constraint if exists vacations_linked_absence_id_fkey;

alter table public.vacations
  add constraint vacations_linked_absence_id_fkey
  foreign key (linked_absence_id) references public.absences(id) on delete set null;

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  target text not null,
  title text not null,
  message text,
  page text,
  record_type text,
  record_id text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.planning_rows (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  row_number integer not null,
  task_name text not null,
  duration text,
  start_date date,
  end_date date,
  project_percentage integer not null default 0 check (project_percentage >= 0 and project_percentage <= 100),
  row_type text default 'Tarefa',
  extra_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.planning_custom_fields (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  name text not null,
  default_value text,
  created_at timestamptz not null default now()
);

create table if not exists public.schedule_rows (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  row_number integer not null,
  operation_pt text not null,
  operation_en text,
  responsible text,
  scheduled_weeks integer[] not null default '{}',
  completed_weeks integer[] not null default '{}',
  evolution integer not null default 0 check (evolution in (0, 25, 50, 75, 100)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mold_photos (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  document_type text not null check (document_type in ('planning', 'schedule')),
  image_url text,
  photo_name text not null default '',
  storage_path text not null default '',
  mime_type text not null default '',
  file_size bigint not null default 0,
  description text,
  created_at timestamptz not null default now()
);

-- Tabela usada pela versao atual do HTML para sincronizar o estado completo.
-- Pode manter esta tabela enquanto a app ainda nao estiver 100% migrada para as tabelas normalizadas acima.
create table if not exists public.duomold_app_state (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('mold-photos', 'mold-photos', true)
on conflict (id) do update
set name = excluded.name,
    public = excluded.public;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_companies_updated_at on public.companies;
create trigger set_companies_updated_at before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists set_vacations_updated_at on public.vacations;
create trigger set_vacations_updated_at before update on public.vacations
for each row execute function public.set_updated_at();

drop trigger if exists set_absences_updated_at on public.absences;
create trigger set_absences_updated_at before update on public.absences
for each row execute function public.set_updated_at();

drop trigger if exists set_planning_rows_updated_at on public.planning_rows;
create trigger set_planning_rows_updated_at before update on public.planning_rows
for each row execute function public.set_updated_at();

drop trigger if exists set_schedule_rows_updated_at on public.schedule_rows;
create trigger set_schedule_rows_updated_at before update on public.schedule_rows
for each row execute function public.set_updated_at();

create index if not exists idx_clients_company_id on public.clients(company_id);
create index if not exists idx_orders_client_id on public.orders(client_id);
create index if not exists idx_vacations_user_id on public.vacations(user_id);
create index if not exists idx_absences_user_id on public.absences(user_id);
create index if not exists idx_notifications_target on public.notifications(target);
create index if not exists idx_planning_rows_order_id on public.planning_rows(order_id);
create index if not exists idx_schedule_rows_order_id on public.schedule_rows(order_id);
create index if not exists idx_mold_photos_order_id on public.mold_photos(order_id);
create unique index if not exists idx_mold_photos_storage_path on public.mold_photos(storage_path) where storage_path <> '';

alter table public.companies enable row level security;
alter table public.clients enable row level security;
alter table public.users enable row level security;
alter table public.orders enable row level security;
alter table public.vacations enable row level security;
alter table public.absences enable row level security;
alter table public.notifications enable row level security;
alter table public.planning_rows enable row level security;
alter table public.planning_custom_fields enable row level security;
alter table public.schedule_rows enable row level security;
alter table public.mold_photos enable row level security;
alter table public.duomold_app_state enable row level security;

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

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'companies',
    'clients',
    'users',
    'orders',
    'vacations',
    'absences',
    'notifications',
    'planning_rows',
    'planning_custom_fields',
    'schedule_rows',
    'mold_photos',
    'duomold_app_state'
  ]
  loop
    execute format('drop policy if exists "%1$s_select_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_insert_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_update_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_delete_anon" on public.%1$I', table_name);

    execute format('create policy "%1$s_select_anon" on public.%1$I for select to anon using (true)', table_name);
    execute format('create policy "%1$s_insert_anon" on public.%1$I for insert to anon with check (true)', table_name);
    execute format('create policy "%1$s_update_anon" on public.%1$I for update to anon using (true) with check (true)', table_name);
    execute format('create policy "%1$s_delete_anon" on public.%1$I for delete to anon using (true)', table_name);
  end loop;
end $$;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'duomold_app_state'
    ) then
      alter publication supabase_realtime add table public.duomold_app_state;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'vacations'
    ) then
      alter publication supabase_realtime add table public.vacations;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'absences'
    ) then
      alter publication supabase_realtime add table public.absences;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'users'
    ) then
      alter publication supabase_realtime add table public.users;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'companies'
    ) then
      alter publication supabase_realtime add table public.companies;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'clients'
    ) then
      alter publication supabase_realtime add table public.clients;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'orders'
    ) then
      alter publication supabase_realtime add table public.orders;
    end if;
    if not exists (
      select 1
      from pg_publication_rel pr
      join pg_publication p on p.oid = pr.prpubid
      join pg_class c on c.oid = pr.prrelid
      join pg_namespace n on n.oid = c.relnamespace
      where p.pubname = 'supabase_realtime'
        and n.nspname = 'public'
        and c.relname = 'notifications'
    ) then
      alter publication supabase_realtime add table public.notifications;
    end if;
  end if;
end;
$$;

insert into public.companies (id, name, vat, email, phone, city, sector, address, notes, status)
values
  ('00000000-0000-0000-0000-000000000101', 'Metal Norte, Lda.', 'PT509876321', 'geral@metalnorte.pt', '+351 255 100 200', 'Porto', 'Metalomecanica', 'Rua Industrial 120, Porto', 'Cliente ativo para acompanhamento de molde.', 'Ativo'),
  ('00000000-0000-0000-0000-000000000102', 'Plastiform Moldes', 'PT514223987', 'info@plastiform.pt', '+351 244 300 550', 'Leiria', 'Moldes', 'Zona Industrial, Leiria', 'Prospeccao iniciada este mes.', 'Ativo')
on conflict (id) do nothing;

insert into public.clients (id, company_id, name, email, password, phone, role, owner, status, notes)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'Ana Martins', 'ana@metalnorte.pt', 'cliente123', '+351 912 345 678', 'Compras', 'Admin', 'Ativo', 'Cliente principal para acompanhamento semanal.'),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000102', 'Carlos Silva', 'carlos@plastiform.pt', 'cliente123', '+351 934 567 210', 'Direcao tecnica', 'Admin', 'Prospecto', 'Aguardar validacao dos dados da empresa.')
on conflict (id) do nothing;

insert into public.users (id, employee_number, name, email, password, phone, profile, department, position, status)
values
  ('00000000-0000-0000-0000-000000000301', 'ADM-001', 'Administrador', 'sistemaduolmold@gmail.com', 'Admin123!', '+351 900 000 001', 'Admin', 'Direcao', 'Administrador', 'Ativo'),
  ('00000000-0000-0000-0000-000000000302', 'RH-001', 'Recursos Humanos', 'rh@empresa.pt', 'rh123', '+351 900 000 002', 'RH', 'Recursos Humanos', 'Gestor RH', 'Ativo'),
  ('00000000-0000-0000-0000-000000000303', 'COL-001', 'Joao Ferreira', 'joao@empresa.pt', 'funcionario123', '+351 900 000 003', 'Funcionario', 'Producao', 'Tecnico', 'Ativo')
on conflict (id) do nothing;

insert into public.orders (id, client_id, reference, title, description, status, progress, due_date, weekly_update, tasks, show_planning_to_client, show_schedule_to_client)
values
  ('00000000-0000-0000-0000-000000000401', '00000000-0000-0000-0000-000000000201', 'OS-2026-001', 'Planeamento de molde', 'Molde tecnico para nova encomenda.', 'Em producao', 45, '2026-06-15', 'Molde em fase de planeamento e validacao tecnica.', 'Revisao tecnica; preparacao MOD 54; preparacao MOD 55.', true, true),
  ('00000000-0000-0000-0000-000000000402', '00000000-0000-0000-0000-000000000202', 'OS-2026-002', 'Ajuste de cavidade', 'Revisao e ajuste de molde existente.', 'Em analise', 20, '2026-06-28', 'Equipa tecnica a rever ficheiros enviados.', 'Analise dimensional; contacto com cliente.', true, true)
on conflict (id) do nothing;

insert into public.vacations (id, user_id, start_date, end_date, days, origin, status, notes, decided_by)
values
  ('00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000303', '2026-07-01', '2026-07-15', 15, 'Admin/RH', 'Aprovado', 'Periodo definido pela administracao.', 'Administrador'),
  ('00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000303', '2026-08-10', '2026-08-14', 5, 'Funcionario', 'Pendente', 'Pedido do funcionario.', null)
on conflict (id) do nothing;

insert into public.absences (id, user_id, date, type, compensate_vacation, status, reason, decided_by)
values
  ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000303', '2026-05-20', 'Justificada', false, 'Pendente', 'Consulta medica', null)
on conflict (id) do nothing;
