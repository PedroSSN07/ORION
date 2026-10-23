# O.R.I.O.N. — Experiência digital

Site institucional em português brasileiro, feito com React, TypeScript e Vite. Direção espacial com escultura orbital original (elemento cenográfico, não substituto da logo), portfólio conceito, universo interativo, áudio sintetizado opcional e contato configurável.

## Executar

Requer Node.js 22.12+ (validado em Node 24) e npm.

```sh
npm ci
npm run dev
```

Abra o endereço informado pelo Vite. Comandos de verificação:

No Windows, você também pode executar `abrir-site.cmd`: ele inicia o Vite e abre o navegador. Mantenha a janela aberta enquanto usa o site. Não abra `index.html` diretamente; React e TypeScript precisam do servidor Vite. Se o PowerShell bloquear `npm.ps1`, use `npm.cmd run dev`.

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
| VITE_INSTAGRAM_URL    | URL HTTPS real. Ausente: link oculto.                                                                                                                                                          |
| VITE_LINKEDIN_URL     | URL HTTPS real. Ausente: link oculto.                                                                                                                                                          |
| VITE_SITE_URL         | Origem pública final, como `https://seu-dominio.com.br`. Gera canonical, og:url e sitemap.xml no build. Sem domínio, não são inventadas URLs.                                                  |

A logo original foi integrada sem alterar o arquivo. O cabeçalho e a seção Sobre apresentam a arte completa; o rodapé também exibe a logo completa, sem recortes. O WhatsApp está configurado; as redes sociais continuam opcionais. Os conceitos Atlas e Forma são estudos autorais; não representam clientes ou resultados da empresa. Os mockups são construídos em CSS, sem fotografias de terceiros.

## Contato pelo WhatsApp

O painel de contato abre `https://wa.me/5588996645739` em uma nova aba. O número fica em `src/config/site.ts`. Não há formulário, coleta de dados ou envio pelo FormSubmit.

A conversa abre com a mensagem “Olá! Vim pelo site da ORION e gostaria de conversar sobre um projeto.” preenchida. O visitante confirma o envio no WhatsApp.

O painel reage ao mouse com iluminação e inclinação. Anéis, estrelas decorativas e esculturas orbitais giram automaticamente. A preferência de movimento reduzido desativa esses efeitos.

## Estrutura

- `src/config/site.ts`: conteúdo e integrações públicas.
- `src/components/layout`: cabeçalho e marca.
- `src/components/three`: cena carregada sob demanda e fallback sem WebGL.
- `src/components/ui`: áudio opt-in.
- `src/sections`: projetos, universo e contato.
- `src/styles/global.css`: design system, composição e responsividade.
- `tests/`: verificações de integridade de links e comportamento do áudio.

## Interação e acessibilidade

Motion controla transições e o progresso da metodologia. IntersectionObserver revela as seções uma única vez; CSS oferece rolagem suave, respeitando movimento reduzido. Não há dependência de GSAP ou Lenis. Tailwind está integrado ao Vite; estilos autorais definem o design system.

A cena utiliza Three.js, React Three Fiber e Drei, carregados em chunk separado quando a cena se aproxima da tela. O pixel ratio e a complexidade das geometrias são limitados, com menos estrelas e sem antialias no mobile. Com movimento reduzido, a alternativa CSS estática é usada. Falha de WebGL mantém o visual CSS; os mesmos pilares podem sempre ser selecionados por botões de teclado (setas, Home e End). O render 3D pausa quando a aba fica oculta ou a cena sai da tela, sem recriar a cena a cada rolagem.

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
