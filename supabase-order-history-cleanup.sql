-- Remove entradas antigas automaticas do historico das encomendas.
-- Mantem apenas entradas cujo detalhe nao seja gerado automaticamente pela app.

update public.orders
set history = coalesce(cleaned.history, '[]'::jsonb)
from (
  select
    orders.id,
    jsonb_agg(entry order by ordinality) filter (
      where not exists (
        select 1
        from jsonb_array_elements_text(coalesce(entry->'details', '[]'::jsonb)) as detail(value)
        where detail.value ~* '^(Estado|Progresso \(%\)|Previsao de entrega|Previsão de entrega|Atualizacao semanal|Atualização semanal|Tarefas internas|Titulo|Título|Descricao|Descrição|Planeamento visivel ao cliente|Planeamento visível ao cliente|Cronograma visivel ao cliente|Cronograma visível ao cliente):'
      )
      and jsonb_array_length(coalesce(entry->'details', '[]'::jsonb)) > 0
    ) as history
  from public.orders
  left join lateral jsonb_array_elements(coalesce(orders.history, '[]'::jsonb)) with ordinality as item(entry, ordinality) on true
  group by orders.id
) as cleaned
where public.orders.id = cleaned.id;
