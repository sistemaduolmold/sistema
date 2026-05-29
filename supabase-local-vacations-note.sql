-- Nota:
-- A app foi alterada para nunca carregar ferias do localStorage nem do duomold_app_state.
-- A fonte unica de ferias passa a ser public.vacations.
--
-- Execute isto apenas para garantir que o estado geral no Supabase tambem fica limpo:

update public.duomold_app_state
set data = jsonb_set(
  coalesce(data, '{}'::jsonb),
  '{vacations}',
  '[]'::jsonb,
  true
)
where id = 'main';
