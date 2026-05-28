# CRM DUOMOLD

Aplicacao para cadastrar clientes, empresas, encomendas, colaboradores, ferias e faltas.
Visual adaptado para a identidade DUOMOLD, com base preta, vermelho e cinza.

## Como abrir

Abra o ficheiro `index.html` no navegador.

## Acesso de demonstracao

Entre com um destes acessos e use o seletor "Ver como" na lateral para demonstrar outros perfis:

- Admin: sistemaduolmold@gmail.com / Admin123!
- RH: rh@empresa.pt / rh123
- Funcionario: joao@empresa.pt / funcionario123
- Cliente: ana@metalnorte.pt / cliente123

## Supabase

O projeto esta configurado para o Supabase `wdgoqfixddwrgycplexi`.

Como ainda nao existem tabelas criadas, abra o Supabase SQL Editor e execute primeiro o ficheiro `supabase-full-schema.sql`.
Ele cria o banco completo do projeto, com clientes, empresas, utilizadores, encomendas, ferias, faltas, notificacoes, planeamento, cronograma e fotos dos moldes.

O ficheiro `supabase-schema.sql` cria apenas a tabela simples de sincronizacao da versao atual do HTML. Use o `supabase-full-schema.sql` para criar o projeto inteiro.

## O que inclui

- Login com email e senha.
- Criacao de utilizadores pelo Admin, incluindo email e senha de acesso.
- Criacao de login/senha para clientes no cadastro de clientes.
- Edicao dos dados no proprio perfil.
- Alteracao de senha por perfil.
- Portal do cliente para acompanhar as suas encomendas.
- Planeamento MOD 54 e Cronograma MOD 55 ligados a cada encomenda.
- Fotos dos moldes no planeamento e no cronograma.
- Paginas funcionais por perfil: Admin, RH, Funcionario e Cliente.
- Cadastro unificado de clientes e empresas.
- Cadastro de colaboradores com perfis Admin, RH e Funcionario.
- Gestao de ferias com limite de 30 dias por colaborador.
- Validacao de ferias e faltas pelo RH ou Admin.
- Notificacoes internas com sininho.
- Pesquisa nas tabelas.
- Edicao e remocao de registos.
- Exportacao dos dados em JSON.
- Sincronizacao preparada com Supabase.
