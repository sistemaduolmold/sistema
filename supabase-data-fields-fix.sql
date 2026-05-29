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
  add column if not exists status text not null default 'Ativo',
  add column if not exists notes text not null default '';

alter table public.users
  add column if not exists employee_number text not null default '',
  add column if not exists phone text not null default '',
  add column if not exists position text not null default '',
  add column if not exists status text not null default 'Ativo';

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

alter table public.vacations
  add column if not exists notes text not null default '',
  add column if not exists decided_by text not null default '',
  add column if not exists map_code text not null default 'F',
  add column if not exists linked_absence_id text,
  add column if not exists approved_by text,
  add column if not exists approved_at timestamptz;

alter table public.vacations
  drop constraint if exists vacations_days_check,
  add constraint vacations_days_check check (days >= 0 and days <= 11);

alter table public.vacations
  drop constraint if exists vacations_origin_check,
  add constraint vacations_origin_check check (
    origin in ('Admin/RH', 'Funcionario', 'Compensacao de falta', 'Compensação de falta')
  );

alter table public.absences
  add column if not exists type text not null default 'Justificada',
  add column if not exists compensate_vacation boolean not null default false,
  add column if not exists decided_by text not null default '',
  add column if not exists attachments jsonb not null default '[]'::jsonb;

alter table public.absences
  drop constraint if exists absences_status_check,
  add constraint absences_status_check check (
    status in ('Pendente', 'Aprovado', 'Rejeitado', 'Justificada', 'Rejeitada')
  );
