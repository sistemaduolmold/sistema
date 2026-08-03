# CRM DUOMOLD

Aplicacao para cadastrar clientes, empresas, encomendas, colaboradores, ferias e faltas.
Visual adaptado para a identidade DUOMOLD, com base preta, vermelho e cinza.

## Como abrir

Abra o ficheiro `index.html` no navegador.

## Acesso de demonstracao

Entre com um destes acessos e use o seletor "Ver como" na lateral para demonstrar outros perfis:

- Admin: sistemaduolmold@gmail.com / Admin123!
- RH: rh@duomold.pt / rh123
- Funcionario: joao@empresa.pt / funcionario123
- Cliente: ana@metalnorte.pt / cliente123

## Supabase

O projeto esta configurado para o Supabase `wdgoqfixddwrgycplexi`.

Como ainda nao existem tabelas criadas, abra o Supabase SQL Editor e execute primeiro o ficheiro `supabase-full-schema.sql`.
Ele cria o banco completo do projeto, com clientes, empresas, utilizadores, encomendas, ferias, faltas, notificacoes, planeamento, cronograma e fotos dos moldes.

Para bases de dados ja existentes, execute também `supabase-mold-photos-storage.sql`. Esse script cria o bucket `mold-photos` no Supabase Storage e garante o campo `orders.mold_photos` como JSONB, para que as imagens novas sejam guardadas como ficheiros e nao como texto na BD.

Para evitar o aviso de segurança do Windows ao descarregar imagens, o botão `Descarregar pasta` depende de um helper local em `duomold-photo-helper.ps1`. No Windows, execute `start-duomold-photo-helper.bat` antes de usar a função. O helper grava os ficheiros localmente e remove a marca de internet dos ficheiros gravados.

O ficheiro `supabase-schema.sql` cria apenas a tabela simples de sincronizacao da versao atual do HTML. Use o `supabase-full-schema.sql` para criar o projeto inteiro.

## Email de notificacoes

A aplicacao tenta enviar as notificacoes de ferias e faltas pela rota `api/send-notification-email` quando estiver publicada no Vercel.

Se o site esta no Vercel, este e o caminho recomendado:

1. No painel do Vercel, vai a `Project Settings` > `Environment Variables`.
2. Adiciona `RESEND_API_KEY` com a tua chave do Resend.
3. Adiciona `EMAIL_FROM` com um remetente do teu dominio, por exemplo `DUOMOLD <noreply@seu-dominio.pt>`.
4. Faz um novo deploy no Vercel para as variaveis entrarem em vigor.
5. Garante que o dominio de envio esta verificado no Resend com SPF/DKIM.

Se a rota do Vercel nao estiver disponivel, a app continua a funcionar com o fallback `mailto:` do navegador.

Tambem foi criado o ficheiro `vercel-email-setup.ps1` com os comandos e notas de configuracao para este fluxo.

Para testar sem dominio proprio, podes definir `EMAIL_TEST_TO` no Vercel com o teu email. Nesse modo, todos os emails do sistema vao para esse endereco de teste.

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
