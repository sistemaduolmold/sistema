-- Atualizacao dos estados das encomendas para BD existente.
-- Execute no SQL Editor do Supabase.
-- Nao cria tabelas: apenas ajusta o valor por defeito e normaliza estados antigos.

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
