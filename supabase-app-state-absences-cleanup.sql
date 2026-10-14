-- Limpa faltas antigas guardadas no estado geral da app.
-- A fonte unica de faltas passa a ser public.absences.

update public.duomold_app_state
set data = jsonb_set(
  coalesce(data, '{}'::jsonb),
  '{absences}',
  '[]'::jsonb,
  true
)
where id = 'main';
