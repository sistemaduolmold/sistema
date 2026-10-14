-- Limpa ferias antigas guardadas no estado geral da app.
-- Use se a tabela public.vacations esta vazia mas a pagina ainda mostra ferias antigas.

update public.duomold_app_state
set data = jsonb_set(
  coalesce(data, '{}'::jsonb),
  '{vacations}',
  '[]'::jsonb,
  true
)
where id = 'main';
