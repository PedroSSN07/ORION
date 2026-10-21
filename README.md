# O.R.I.O.N. — Experiência digital

Site institucional em português brasileiro, feito com React, TypeScript e Vite. Direção espacial com escultura orbital original (elemento cenográfico, não substituto da logo), portfólio conceito, universo interativo, áudio sintetizado opcional e contato configurável.

## Executar

Requer Node.js 22.12+ (validado em Node 24) e npm.

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. Comandos de verificação:

```sh
npm run lint
npm test
npm run build
npm run preview
```

O build gera `dist/`, que pode ser publicado em uma hospedagem estática com HTTPS. Não há dependência de um servidor Node em produção. `npm ci` usa as versões registradas em `package-lock.json`.

## Configuração antes de publicar

Copie `.env.example` para `.env.local`, preencha os campos disponíveis e gere um novo build. Todas as variáveis `VITE_` são públicas: nunca coloque tokens secretos nelas.

| Variável              | Finalidade                                                                                                                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| VITE_LOGO_URL         | Caminho da logo original, por exemplo `/logo.webp`. Coloque o arquivo em `public/`. A logo fornecida já está integrada em `/orion-futurista.png`; esta variável permite substituição opcional. |
| VITE_CONTACT_ENDPOINT | URL HTTPS de um backend que aceite o contrato de contato abaixo.                                                                                                                               |
| VITE_WHATSAPP_NUMBER  | Número real com código de país e DDD, somente dígitos. Ausente: link oculto.                                                                                                                   |
| VITE_INSTAGRAM_URL    | URL HTTPS real. Ausente: link oculto.                                                                                                                                                          |
| VITE_LINKEDIN_URL     | URL HTTPS real. Ausente: link oculto.                                                                                                                                                          |
| VITE_SITE_URL         | Origem pública final, como `https://seu-dominio.com.br`. Gera canonical, og:url e sitemap.xml no build. Sem domínio, não são inventadas URLs.                                                  |

A logo original foi integrada sem alterar o arquivo. O cabeçalho e a seção Sobre apresentam a arte completa; o rodapé também exibe a logo completa, sem recortes. O e-mail de destino está configurado; WhatsApp e redes sociais continuam opcionais. Os conceitos Atlas e Forma são estudos autorais; não representam clientes ou resultados da empresa. Os mockups são construídos em CSS, sem fotografias de terceiros.

## Contato por e-mail

O formulário está configurado para `pedrosebastiaojl@gmail.com` usando o endpoint AJAX do FormSubmit. Funciona em hospedagem estática, sem senha do Gmail, chave privada ou servidor próprio. `VITE_CONTACT_ENDPOINT` permite substituir o destino padrão; variáveis VITE são públicas.

### Ativar o recebimento

1. Execute `npm run dev` e abra o endereço HTTP do Vite (não abra index.html diretamente).
2. Preencha e envie uma mensagem de teste pelo formulário.
3. Abra a caixa de entrada de `pedrosebastiaojl@gmail.com`, incluindo Spam, e confirme o e-mail de ativação do FormSubmit.
4. Faça outro envio e confira o recebimento real. Ao mudar para o domínio de produção, teste novamente e confirme eventual nova ativação.

A integração foi validada por testes locais com respostas simuladas do provedor; a entrega real e a ativação ainda dependem da confirmação na caixa de e-mail. O site só apresenta confirmação após resposta positiva do serviço, e não afirma que a mensagem já chegou ao Gmail. Sem ativação, o provedor pode reter mensagens até a confirmação. Uma resposta explícita de ativação pendente mantém os campos preenchidos.

As mensagens incluem nome, e-mail, tipo de projeto e texto; o assunto é “Novo contato pelo site O.R.I.O.N.” e Reply-To aponta ao visitante. Há campo honeypot e as proteções padrão do provedor não são desativadas. Os dados passam pelo FormSubmit, informado junto ao botão de envio. O serviço precisa estar acessível pela rede.

Para usar um backend próprio, configure VITE_CONTACT_ENDPOINT. Ele deve aceitar POST JSON com os campos do formulário e retornar HTTP 2xx e `{"success":true}` somente depois de aceitar a mensagem. Erros de rede, HTTP, resposta inválida e timeout de 15 segundos mantêm os dados para nova tentativa. Nunca coloque credenciais de e-mail em variáveis VITE.

Documentação: https://formsubmit.co/ajax-documentation e https://formsubmit.co/help.

## Estrutura

- `src/config/site.ts`: conteúdo e integrações públicas.
- `src/components/layout`: cabeçalho e marca.
- `src/components/three`: cena carregada sob demanda e fallback sem WebGL.
- `src/components/ui`: áudio opt-in.
- `src/sections`: projetos, universo e contato.
- `src/styles/global.css`: design system, composição e responsividade.
- `tests/`: verificações de integridade de links e guardas de confirmação de envio.

## Interação e acessibilidade

Motion controla entradas e transições; GSAP/ScrollTrigger controla revelações e linha da metodologia; Lenis suaviza navegação apenas quando movimento reduzido não está solicitado. Tailwind está integrado ao Vite; estilos autorais definem o design system.

A cena utiliza Three.js, React Three Fiber e Drei, carregados em chunk separado. O pixel ratio é limitado, com menos estrelas e sem antialias no mobile. Com movimento reduzido, a alternativa CSS estática é usada. Falha de WebGL mantém o visual CSS; os mesmos pilares podem sempre ser selecionados por botões de teclado (setas, Home e End). O render 3D pausa quando a aba fica oculta.

Áudio inicia desligado e só cria AudioContext ao clicar no controle. Sons são sintetizados localmente, sem arquivos licenciados. Volume é ajustável. Não há rastreadores, fontes externas, reprodução automática sonora ou dependência de imagens remotas.

## Validação de lançamento

Build e lint não substituem testes em aparelhos reais. Antes de lançar, valide a logo, domínio, endpoint real, redes, contraste com eventuais novos assets, navegação por teclado, Safari/iOS e Android, e Lighthouse em condições representativas. A meta de 90+ não é uma pontuação medida ou garantida. A cena 3D tem custo de download e GPU; o fallback permanece disponível. Configure compressão Brotli/Gzip, cache longo para `/assets/` e revalidação para HTML na hospedagem.

## Abrir no VS Code sem domínio

Abra `ORION.code-workspace` no VS Code, ou use **Arquivo > Abrir Pasta** e selecione esta pasta ORION. No terminal integrado, execute `npm run dev` e abra o endereço local informado. As dependências já estão instaladas neste computador; em outro computador execute primeiro `npm ci`.

Também é possível usar **Terminal > Executar Tarefa > O.R.I.O.N.: iniciar site local**. Para encerrar o servidor, pressione Ctrl+C no terminal. Não use Live Server para este projeto React: use o servidor Vite pelo comando acima.

Não é necessário comprar ou configurar domínio para desenvolver e testar. VS Code é o editor; a publicação será feita depois em uma hospedagem. Mantenha VITE_SITE_URL vazio enquanto estiver trabalhando localmente.

## Áudio por profundidade da página

O áudio continua opt-in. Ao ativar, o volume manual começa em 45%; o topo usa esse nível integral e o fim da página usa 12% dele, com transição suave e reversível ao subir. O controle manual afeta tanto o ambiente quanto os cliques. Todos os cliques na página usam um toque digital curto de duas vozes, incluindo áreas vazias e controles. O ambiente é uma frase musical original de 32 segundos com notas suaves e espaçadas, em volume baixo, substituindo o drone grave contínuo. A aba oculta fica silenciosa. A logo completa original aparece no cabeçalho, com dimensão adaptada para celular.

## GitHub Pages

Em Settings > Pages > Build and deployment, selecione **GitHub Actions** como Source. O workflow `.github/workflows/pages.yml` instala dependências, executa verificações, compila com Vite e publica exclusivamente `dist/` a cada push em `main`.

Não publique a pasta raiz do repositório: seu index.html referencia TypeScript de desenvolvimento, que o navegador não executa diretamente. O workflow determina a subpasta pelo GitHub Pages; a logo, os cursores e os scripts acompanham esse caminho. Para este repositório, a URL é https://pedrossn07.github.io/ORION/.

Para verificar o mesmo build localmente em PowerShell:

```powershell
$env:VITE_BASE_PATH = '/ORION/'
npm run build
npm run preview
```

Abra http://127.0.0.1:4173/ORION/. Para voltar ao padrão em outro build, use `Remove-Item Env:VITE_BASE_PATH`. Ao configurar um domínio próprio, o workflow usa o caminho atualizado informado pelo Pages.
