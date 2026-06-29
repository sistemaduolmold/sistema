-- DUOMOLD CRM - Schema Supabase compativel com a app atual
-- Use este ficheiro numa base de dados limpa do Supabase antes de publicar.
-- Se ja tiver dados reais, faca backup/exportacao antes de recriar ou adaptar tabelas.

create table if not exists public.companies (
  id text primary key,
  name text not null,
  vat text not null default '',
  email text not null default '',
  phone text not null default '',
  city text not null default '',
  sector text not null default '',
  address text not null default '',
  postal_code text not null default '',
  tax_id text not null default '',
  notes text not null default '',
  status text not null default 'Ativo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id text primary key,
  company_id text references public.companies(id) on delete set null,
  name text not null,
  email text not null default '',
  password text not null default '',
  phone text not null default '',
  role text not null default '',
  owner text not null default 'Admin',
  portal_document text not null default 'Cronograma' check (portal_document in ('Cronograma', 'Planeamento')),
  portal_language text not null default 'Português' check (portal_language in ('Português', 'Inglês')),
  status text not null default 'Ativo',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users (
  id text primary key,
  employee_number text not null default '',
  name text not null,
  email text not null unique,
  profile text not null check (profile in ('Admin', 'RH', 'Funcionario')),
  role text not null default 'Funcionario',
  team text not null default '',
  department text not null default '',
  phone text not null default '',
  admission_date date,
  vacation_request_extra_days integer not null default 0 check (vacation_request_extra_days between 0 and 3),
  position text not null default '',
  status text not null default 'Ativo',
  password text not null default '',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id text primary key,
  client_id text references public.clients(id) on delete set null,
  reference text not null default '',
  title text not null,
  description text not null default '',
  status text not null default 'Nota de encomenda recebida',
  priority text not null default 'Media',
  progress integer not null default 0,
  due_date date,
  weekly_update text not null default '',
  tasks text not null default '',
  show_planning_to_client boolean not null default true,
  show_schedule_to_client boolean not null default true,
  delivered boolean not null default false,
  delivered_at timestamptz,
  delivered_by text references public.users(id) on delete set null,
  created_by text references public.users(id) on delete set null,
  assigned_to text references public.users(id) on delete set null,
  history jsonb not null default '[]'::jsonb,
  schedule jsonb not null default '{}'::jsonb,
  planning jsonb,
  mold_photos jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.vacations (
  id text primary key,
  user_id text not null references public.users(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  days integer not null check (days >= 0 and days <= 30),
  status text not null check (status in ('Pendente', 'Aprovado', 'Rejeitado', 'Cancelado')),
  notes text not null default '',
  origin text not null default 'Funcionario' check (
    origin in ('Admin/RH', 'Funcionario', 'Compensacao de falta', 'Compensação de falta')
  ),
  map_code text not null default 'F' check (map_code in ('F', 'BG', 'DC')),
  linked_absence_id text,
  decided_by text not null default '',
  approved_by text references public.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.absences (
  id text primary key,
  user_id text not null references public.users(id) on delete cascade,
  date date not null,
  type text not null default 'Justificada',
  compensate_vacation boolean not null default false,
  compensation_mode text not null default 'Descontar do salário',
  reason text not null default '',
  status text not null check (status in ('Pendente', 'Aprovado', 'Rejeitado', 'Justificada', 'Rejeitada')),
  decided_by text not null default '',
  delivered boolean not null default false,
  delivered_at timestamptz,
  delivered_by text references public.users(id) on delete set null,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id text primary key,
  target text not null,
  title text not null,
  message text not null default '',
  page text not null default '',
  record_type text not null default '',
  record_id text not null default '',
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.duomold_app_state (
  id text primary key default 'main',
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

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
create trigger set_companies_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

drop trigger if exists set_clients_updated_at on public.clients;
create trigger set_clients_updated_at
before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

drop trigger if exists set_vacations_updated_at on public.vacations;
create trigger set_vacations_updated_at
before update on public.vacations
for each row execute function public.set_updated_at();

drop trigger if exists set_absences_updated_at on public.absences;
create trigger set_absences_updated_at
before update on public.absences
for each row execute function public.set_updated_at();

drop trigger if exists set_app_state_updated_at on public.duomold_app_state;
create trigger set_app_state_updated_at
before update on public.duomold_app_state
for each row execute function public.set_updated_at();

create index if not exists idx_clients_company_id on public.clients(company_id);
create index if not exists idx_orders_client_id on public.orders(client_id);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_vacations_user_id on public.vacations(user_id);
create index if not exists idx_vacations_status on public.vacations(status);
create index if not exists idx_absences_user_id on public.absences(user_id);
create index if not exists idx_notifications_target on public.notifications(target);

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
    'duomold_app_state'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);

    execute format('drop policy if exists "%1$s_select_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_insert_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_update_anon" on public.%1$I', table_name);
    execute format('drop policy if exists "%1$s_delete_anon" on public.%1$I', table_name);

    execute format('create policy "%1$s_select_anon" on public.%1$I for select to anon using (true)', table_name);
    execute format('create policy "%1$s_insert_anon" on public.%1$I for insert to anon with check (true)', table_name);
    execute format('create policy "%1$s_update_anon" on public.%1$I for update to anon using (true) with check (true)', table_name);
    execute format('create policy "%1$s_delete_anon" on public.%1$I for delete to anon using (true)', table_name);
  end loop;
end;
$$;

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

insert into public.users (id, name, email, profile, role, team, department, password, active)
values
  ('user-admin', 'Administrador', 'admin@duomoldes.pt', 'Admin', 'Admin', 'Gestao', 'Administracao', 'admin123', true),
  ('user-rh', 'Recursos Humanos', 'rh@duomoldes.pt', 'RH', 'RH', 'RH', 'Recursos Humanos', 'rh123', true),
  ('user-funcionario', 'Joao Ferreira', 'joao.ferreira@duomoldes.pt', 'Funcionario', 'Funcionario', 'Producao', 'Moldes', 'func123', true)
on conflict (id) do nothing;
