-- Correcao de campos usados pela app atual.
-- Execute no SQL Editor se ja criou as tabelas antes desta atualizacao.

alter table public.companies
  add column if not exists vat text not null default '',
  add column if not exists email text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists city text not null default '',
  add column if not exists sector text not null default '',
  add column if not exists notes text not null default '',
  add column if not exists status text not null default 'Ativo';

alter table public.clients
  add column if not exists password text not null default '',
  add column if not exists role text not null default '',
  add column if not exists owner text not null default 'Admin',
  add column if not exists portal_document text not null default 'Cronograma',
  add column if not exists portal_language text not null default 'Português',
  add column if not exists status text not null default 'Ativo',
  add column if not exists notes text not null default '';

update public.clients
set portal_document = 'Cronograma'
where portal_document is null
   or portal_document not in ('Cronograma', 'Planeamento');

update public.clients
set portal_language = 'Português'
where portal_language is null
   or portal_language not in ('Português', 'Inglês');

alter table public.clients
  drop constraint if exists clients_portal_document_check,
  add constraint clients_portal_document_check check (portal_document in ('Cronograma', 'Planeamento')),
  drop constraint if exists clients_portal_language_check,
  add constraint clients_portal_language_check check (portal_language in ('Português', 'Inglês'));

alter table public.users
  add column if not exists employee_number text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists admission_date date,
  add column if not exists vacation_request_extra_days integer not null default 0,
  add column if not exists position text not null default '',
  add column if not exists status text not null default 'Ativo';

alter table public.users
  drop constraint if exists users_vacation_request_extra_days_check,
  add constraint users_vacation_request_extra_days_check check (vacation_request_extra_days between 0 and 3);

alter table public.orders
  add column if not exists reference text not null default '',
  add column if not exists progress integer not null default 0,
  add column if not exists weekly_update text not null default '',
  add column if not exists tasks text not null default '',
  add column if not exists show_planning_to_client boolean not null default true,
  add column if not exists show_schedule_to_client boolean not null default true,
  add column if not exists history jsonb not null default '[]'::jsonb,
  add column if not exists schedule jsonb not null default '{}'::jsonb,
  add column if not exists planning jsonb,
  add column if not exists mold_photos jsonb not null default '[]'::jsonb;

alter table public.orders
  alter column status set default 'Nota de encomenda recebida';

update public.orders
set status = case status
  when 'Aberta' then 'Nota de encomenda recebida'
  when 'Recebido' then 'Nota de encomenda recebida'
  when 'Em producao' then 'Em produção'
  when 'Em analise' then 'Em análise'
  when 'Em desenho preliminar (3D) - aprovação de aços pendente' then 'Em desenho preliminar (3D) – aprovação de aços pendente'
  when 'Em desenho pre-final (3D) - aprovacao de maquinacoes pendente' then 'Em desenho pré-final (3D) – aprovação de maquinações pendente'
  when 'Em desenho pré-final (3D) - aprovação de maquinações pendente' then 'Em desenho pré-final (3D) – aprovação de maquinações pendente'
  when '1º Ensaio Realizado' then '1.º ensaio realizado'
  when '1º ensaio realizado' then '1.º ensaio realizado'
  when 'Concluido' then 'Concluído'
  else status
end
where status in (
  'Aberta',
  'Recebido',
  'Em producao',
  'Em analise',
  'Em desenho preliminar (3D) - aprovação de aços pendente',
  'Em desenho pre-final (3D) - aprovacao de maquinacoes pendente',
  'Em desenho pré-final (3D) - aprovação de maquinações pendente',
  '1º Ensaio Realizado',
  '1º ensaio realizado',
  'Concluido'
);

alter table public.vacations
  add column if not exists notes text not null default '',
  add column if not exists decided_by text not null default '',
  add column if not exists map_code text not null default 'F',
  add column if not exists linked_absence_id text,
  add column if not exists approved_by text,
  add column if not exists approved_at timestamptz;

alter table public.vacations
  drop constraint if exists vacations_days_check,
  add constraint vacations_days_check check (days >= 0 and days <= 30),
  drop constraint if exists vacations_origin_check,
  add constraint vacations_origin_check check (
    origin in ('Admin/RH', 'Funcionario', 'Compensacao de falta', 'Compensação de falta')
  );

alter table public.absences
  add column if not exists type text not null default 'Justificada',
  add column if not exists compensate_vacation boolean not null default false,
  add column if not exists compensation_mode text not null default 'Descontar do salário',
  add column if not exists decided_by text not null default '',
  add column if not exists attachments jsonb not null default '[]'::jsonb;

update public.absences
set compensation_mode = case
  when compensate_vacation then 'Compensar com 1 dia de férias'
  else 'Descontar do salário'
end
where compensation_mode is null or compensation_mode = '';

alter table public.absences
  drop constraint if exists absences_status_check,
  add constraint absences_status_check check (
    status in ('Pendente', 'Aprovado', 'Rejeitado', 'Justificada', 'Rejeitada')
  );

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
