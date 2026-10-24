# O.R.I.O.N. 2.0 — Tecnologia que impulsiona o amanhã

Experiência institucional em React 19, TypeScript e Vite. A logo original foi preservada integralmente. A auditoria anterior às alterações está em `docs/AUDITORIA-2.0.md`.

## Executar no VS Code

Requer Node.js 22.12+ (validado em Node 24) e npm. Abra esta pasta no VS Code e execute no terminal:

```powershell
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite. No PowerShell, se `npm.ps1` estiver bloqueado, use `npm.cmd` em lugar de `npm`. Também é possível executar `abrir-site.cmd` ou a tarefa de desenvolvimento do workspace. Mantenha o servidor aberto enquanto usa o site; Ctrl+C encerra. Não abra `index.html` diretamente nem use Live Server: este projeto precisa do Vite.

```powershell
npm run lint
npm test
npm run build
npm run preview
```

`npm ci` instala as versões do lockfile. `build` valida TypeScript e gera `dist/`. A produção é estática e não exige servidor Node.

## Experiência

- Abertura de 2,4 segundos, ignorável, uma vez por sessão; omitida com preferência por movimento reduzido.
- Hero editorial com escultura orbital 3D, tipografia local Inter/Space Grotesk e CTAs reais.
- Soluções, metodologia, diferenciais e projetos conceito Atlas/Forma, com mockups desktop/mobile em CSS e detalhes em diálogo. Não são clientes ou resultados reais.
- Universo com quatro planetas, seleção com aproximação de câmera, rotação manual opcional e retorno à visão geral. Cards oferecem as mesmas informações por teclado.
- Modo sem 3D, fallback CSS para indisponibilidade/perda de WebGL, movimento reduzido, pausa fora da tela e com aba oculta. Rotação manual precisa ser ativada para não capturar a rolagem normal no celular.
- Menu mobile em diálogo nativo, fechamento por Escape, links de salto e foco visível.
- Áudio desligado inicialmente. O controle ativa ambiente sintetizado discreto e toques em links/botões; volume inicial manual de 45%, reduzido gradualmente até 12% desse nível no fim da página. Aba oculta fica silenciosa. Não há arquivos musicais licenciados.

## Contato

O formulário valida nome, e-mail, serviço e descrição de 20 a 1.500 caracteres. Orçamento é opcional. Ele prepara a mensagem localmente e mostra um link para revisar e enviar no WhatsApp. O visitante confirma o envio no WhatsApp; preparar a solicitação não significa enviá-la.

Não há backend, armazenamento do briefing, envio automático por e-mail ou FormSubmit. O canal preservado é `5588996645739`. Se desejar recebimento automático por e-mail, será necessária uma integração real com serviço/backend e proteção contra abuso; não coloque credenciais no frontend.

## Configuração

Copie `.env.example` para `.env.local` se precisar personalizar. Refaça o build após alterações. Variáveis `VITE_` são públicas: não insira segredos.

| Variável | Uso |
| --- | --- |
| VITE_WHATSAPP_NUMBER | Número com país e DDD; padrão 5588996645739. |
| VITE_INSTAGRAM_URL / VITE_LINKEDIN_URL | URLs HTTPS reais; links ficam ocultos se ausentes. |
| VITE_LOGO_URL | Substituição opcional; normalmente deixe vazia para preservar a logo original e seu caminho correto no Pages. |
| VITE_SITE_URL | URL pública completa, incluindo `/ORION/`; gera canonical, og:url e sitemap. |
| VITE_BASE_PATH | `/` localmente; o workflow usa a subpasta informada pelo GitHub Pages. |

## Estrutura e manutenção

- `src/App.tsx`: composição e seções institucionais.
- `src/sections/`: hero, projetos, universo e contato.
- `src/config/site.ts`: conteúdo e canais públicos.
- `src/config/projects.ts`: dados dos conceitos; inclua apenas informações e links reais.
- `src/components/three/`: cena carregada sob demanda e fallback.
- `src/components/ui/`: abertura e controle de áudio.
- `src/lib/brief.ts`: validação e construção da mensagem.
- `src/styles/experience.css`: tokens visuais, composição 2.0 e breakpoints; `global.css` mantém estilos base compartilhados.
- `src/styles/fonts.css`: fontes locais, sem requisição ao Google Fonts.
- `tests/`: áudio, briefing e integridade de âncoras.

## GitHub Pages

Destino: https://pedrossn07.github.io/ORION/

Em **Settings > Pages > Build and deployment**, selecione **GitHub Actions**. O workflow `.github/workflows/pages.yml` usa Node 24, instala dependências, executa lint/testes/build e publica somente `dist/` após push em `main`. A configuração base vem do Pages; não publique a raiz com TypeScript cru.

Para reproduzir localmente o build de publicação:

```powershell
$env:VITE_BASE_PATH = '/ORION/'
$env:VITE_SITE_URL = 'https://pedrossn07.github.io/ORION/'
npm run build
npm run preview
```

Abra http://127.0.0.1:4173/ORION/. A navegação usa âncoras, sem rotas SPA que dependam de redirecionamento do servidor. Para voltar ao build local padrão:

```powershell
Remove-Item Env:VITE_BASE_PATH
Remove-Item Env:VITE_SITE_URL
```

## Verificação e limites

Consulte `docs/VALIDACAO-2.0.md` para os testes desta entrega. O bundle 3D permanece separado e é carregado sob demanda; o Vite sinaliza seu tamanho acima de 500 kB (aproximadamente 906 kB, 245 kB gzip). Não ocultamos o aviso. Seu custo de rede/GPU ainda deve ser medido em celulares reais. A alternativa sem 3D permanece disponível.

Não há nota Lighthouse medida ou garantia de 90+. Antes de publicar, valide também Safari/iOS, Android, leitor de tela e contraste com qualquer novo conteúdo. A atualização local não muda o site público até que os arquivos sejam enviados ao repositório e o workflow termine com sucesso.
