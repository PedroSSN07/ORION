# Auditoria inicial — O.R.I.O.N. 2.0

Base auditada: commit f67fc96, em 24/10/2026. Árvore de trabalho limpa antes das alterações.

## Preservar
- React 19, TypeScript estrito, Vite 7, Tailwind 4, Motion, Three/R3F/Drei; sem necessidade de GSAP/Lenis adicionais.
- Logo original PNG 1774 × 887, paleta espacial, áudio sintetizado opt-in e cursor SVG.
- Carregamento progressivo da cena, limite de DPR, fallback CSS e pausa fora da tela.
- Contato real por WhatsApp 5588996645739, sem servidor de formulário configurado.
- GitHub Actions publica dist e obtém base_path/base_url do Pages. Logo usa BASE_URL; Vite reescreve URLs dos cursores no CSS.

## Lacunas encontradas
- App.tsx concentra conteúdo, hero, metodologia, serviços e rodapé. Projetos estão definidos dentro do componente.
- Universo repete a escultura do hero: não oferece rotação manual, foco de câmera ou retorno à visão geral; quatro pontos têm materiais muito semelhantes.
- Menu mobile é um painel simples, sem confinamento de foco ou fechamento por Escape.
- Áudio dispara em qualquer clique, inclusive em áreas vazias; novo briefing pede interações selecionadas.
- Não existe introdução opcional nem formulário para estruturar uma solicitação.
- Estilos acumulam sobrescritas e fontes de sistema; falta escala centralizada de tokens.
- Portfólio contém dois conceitos válidos, mas seus detalhes carecem de escopo e funcionalidades. Não há demonstrações externas para vincular.
- A esfera WebGL tem custo significativo; não prometer Lighthouse 90 sem medição.

## Decisões
Evoluir os componentes existentes, extrair hero e dados de projeto, usar fontes WOFF2 locais e um arquivo de tokens/estilos 2.0 organizado. Intro não modal de até 2,4s, ignorável, uma vez por sessão e ausente com movimento reduzido. Universo com quatro planetas e controles opt-in de arraste para preservar a rolagem mobile. Formulário prepara mensagem para WhatsApp, com revisão e envio explícito no aplicativo; nunca afirmar que uma mensagem foi entregue. Preservar a estratégia de publicação.

A tentativa inicial de leitura do site público pela ferramenta web não retornou conteúdo; isso não comprova indisponibilidade do site. Verificações posteriores devem ser registradas separadamente.
