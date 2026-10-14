-- Limpeza de ferias antigas de demonstracao.
-- Execute no SQL Editor se aparecerem ferias que nao foram pedidas/guardadas na BD real.

delete from public.vacations
where id in ('vac-1', 'vac-2')
   or user_id is null
   or user_id = ''
   or not exists (
    select 1
    from public.users
    where users.id = vacations.user_id
  );

update public.vacations
set days = 30
where days > 30;

alter table public.vacations
  drop constraint if exists vacations_days_check,
  add constraint vacations_days_check check (days >= 0 and days <= 30);
