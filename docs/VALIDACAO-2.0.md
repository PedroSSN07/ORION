# Validação O.R.I.O.N. 2.0 — 24/10/2026

## Executado

- `npm run lint`: aprovado.
- `npm test`: 8 testes aprovados (volume por rolagem, cliques, loop de áudio, validação do briefing, codificação de caracteres no WhatsApp e âncoras internas).
- `npm run build`: TypeScript e Vite aprovados, tanto com base local quanto com `/ORION/` e URL pública configurada.
- HTTP na prévia de produção: HTML, logo, dois cursores, sitemap, CSS, dois bundles JS e duas fontes retornaram 200 com MIME correto.
- Canonical e sitemap apontam para `https://pedrossn07.github.io/ORION/`.
- Navegador desktop: hero e cena 3D renderizados; card Inovação alterou o painel; modo sem 3D exibiu fallback e desabilitou rotação manual.
- Formulário: preenchimento com dados fictícios, escolha de serviço e preparação da solicitação; confirmação informou que a mensagem ainda não foi enviada. Nenhuma mensagem foi enviada.
- Mobile com viewport solicitado 390×844 (área útil observada 375 px): hero e menu inspecionados; largura de rolagem igual à largura útil, sem overflow horizontal; menu abriu e fechou por Escape.
- Áudio: ativação exibiu controle de volume; desativação funcionou. Não foi feita avaliação auditiva humana.
- Build de produção no navegador: conteúdo renderizado em `/ORION/`; modal Atlas abriu com detalhes e fechou por Escape; atualização em âncora do universo manteve o conteúdo disponível.
- Console inspecionado sem erros nos percursos exercitados.
- `git diff --check`: sem erros de whitespace, apenas avisos de conversão LF/CRLF do Git no Windows.

## Limites e próximos testes

- O pacote 3D gera aviso de tamanho do Vite: cerca de 906 kB minificado / 245 kB gzip. Ele é lazy e pausa fora da tela; isso não substitui medição de GPU/rede em aparelhos reais.
- Lighthouse, Safari/iOS, Android físico, leitor de tela, contraste automatizado e arrasto/zoom em todos os dispositivos não foram medidos/testados. O modo sem 3D foi exercitado; perda real de contexto WebGL não foi induzida.
- Testes de teclado cobriram Escape nos diálogos; uma auditoria completa de ordem de foco permanece recomendada.
- O contato é uma passagem explícita para WhatsApp, sem backend ou entrega automática por e-mail.
- A versão pública não foi atualizada nesta entrega. A validação de subpasta foi local; nenhum resultado de deploy no GitHub Actions foi presumido.

## Continuação — 26/10/2026

- Falhas de renderização/contexto 3D agora são comunicadas ao universo; a rotação fica indisponível e a legenda orienta a usar os cards.
- Modal de projeto usa abertura nativa pelo ciclo de vida React, com retorno explícito de foco ao card de origem.
- Formulário direciona o foco ao link de revisão após preparar a mensagem, ou ao aviso de erro.
- Links de demonstração são exibidos apenas quando um endereço HTTPS é configurado no projeto; nenhum endereço fictício foi adicionado.
- No navegador, Escape fechou o modal Atlas e devolveu o foco ao card; após preencher dados fictícios, o foco foi para “Revisar e enviar no WhatsApp”. Nenhuma mensagem foi enviada.
- Lint e 8 testes aprovados. Falha real de WebGL continua sem simulação em navegador.
- Build de produção aprovado nesta continuação; permanece o aviso de tamanho do bundle 3D (aproximadamente 906 kB / 245 kB gzip).
