import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  MotionConfig,
} from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Layers3,
  PenTool,
  Workflow,
  RefreshCw,
  ArrowRight,
  Check,
} from "lucide-react";
import Header, { Brand } from "./components/layout/Header";
import AudioControl from "./components/ui/AudioControl";
import PointerEffects from "./components/ui/PointerEffects";
import Orbital from "./components/three/Orbital";
import Contact from "./sections/Contact";
import Projects from "./sections/Projects";
import Universe from "./sections/Universe";
import { config, solutions } from "./config/site";
const icons = [Code2, Layers3, PenTool, Workflow, RefreshCw];
const steps = [
  [
    "Descoberta",
    "Primeiro, escutar. Entendemos sua ideia, seus desafios e o que precisa mudar.",
  ],
  [
    "Planejamento",
    "Traçamos a rota. Estratégia, arquitetura e design dão forma ao caminho.",
  ],
  [
    "Desenvolvimento",
    "Construímos juntos. Código, experimentação e validação em cada etapa.",
  ],
  [
    "Entrega e Evolução",
    "É só o começo. Publicamos, acompanhamos e abrimos espaço para evoluir.",
  ],
];
export default function App() {
  const reduced = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const method = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: methodProgress } = useScroll({
    target: method,
    offset: ["start 0.8", "end 0.65"],
  });
  const timelineScale = useTransform(methodProgress, [0, 1], [0, 1]);
  useEffect(() => {
    if (reduced || !root.current) return;
    const elements = root.current.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((element) => {
      // Content already on screen must never disappear during initialization.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92)
        return;
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
  }, [reduced]);
  return (
    <MotionConfig reducedMotion="user">
      <div ref={root}>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <motion.div
          className="page-progress"
          style={{ scaleX: scrollYProgress }}
        />
        <Header />
        <main id="conteudo">
          <section id="inicio" className="hero">
            <div className="hero-grid" />
            <div className="hero-orbit">
              <Orbital />
            </div>
            <div className="hero-content">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <span className="status-dot" /> IDEIAS SEM LIMITES. TECNOLOGIA
                COM PROPÓSITO.
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                Transformamos
                <br />
                ideias em experiências
                <br />
                digitais <em>extraordinárias.</em>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 1 }}
              >
                <p className="hero-description">
                  Desenvolvemos soluções tecnológicas que conectam
                  <br className="desktop-break" /> criatividade, inovação e
                  resultados.
                </p>
                <div className="hero-actions">
                  <a href="#solucoes" className="button gold">
                    Explorar soluções <ArrowUpRight size={18} />
                  </a>
                  <a href="#contato" className="button plain">
                    Começar um projeto <ArrowRight size={17} />
                  </a>
                </div>
              </motion.div>
            </div>
            <div className="hero-bottom">
              <a href="#sobre">
                <span className="scroll-icon">
                  <ArrowDown size={15} />
                </span>{" "}
                CONTINUE EXPLORANDO
              </a>
              <span className="hero-tag">
                TECNOLOGIA QUE IMPULSIONA O AMANHÃ.
              </span>
              <span className="coordinates">
                DESIGN & CÓDIGO <span>—</span> BRASIL
              </span>
            </div>
          </section>
          <div className="capability-strip">
            <span>ESTRATÉGIA</span>
            <i />
            DESIGN<span className="strip-star">✦</span>TECNOLOGIA
            <i />
            <span>EXPERIÊNCIA</span>
            <span className="strip-star">✦</span>EVOLUÇÃO
          </div>
          <section id="sobre" className="section about reveal">
            <p className="eyebrow">01 / NOSSA ESSÊNCIA</p>
            <div className="about-grid">
              <div className="about-identity">
                <h2>
                  O futuro começa
                  <br />
                  com <em>uma ideia.</em>
                </h2>
                <img
                  className="identity-art"
                  src={config.logo}
                  alt="Logo original O.R.I.O.N.: órbita cósmica, estrela central e nome da empresa"
                  width="1774"
                  height="887"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div>
                <p className="lead">
                  E ganha vida quando criatividade
                  <br className="desktop-break" /> e tecnologia encontram
                  direção.
                </p>
                <p>
                  Somos a O.R.I.O.N. — Organização de Recursos, Inovação,
                  Operações e Negócios. Uma empresa de desenvolvimento
                  tecnológico que transforma desafios em possibilidades
                  digitais.
                </p>
                <p>
                  Unimos olhar criativo, cuidado com os detalhes e engenharia de
                  software para construir experiências que fazem sentido para
                  pessoas e negócios.
                </p>
                <a className="text-link" href="#metodologia">
                  Conheça nossa forma de criar <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="about-signature">
              <span>CRIATIVIDADE PARA IMAGINAR.</span>
              <div />
              <span>TECNOLOGIA PARA REALIZAR.</span>
            </div>
          </section>
          <section id="solucoes" className="section solutions">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">02 / O QUE PODEMOS CONSTRUIR</p>
                <h2>
                  Seu desafio.
                  <br />
                  <em>Nossa próxima órbita.</em>
                </h2>
              </div>
              <p>
                Da primeira ideia à próxima versão.
                <br />
                Soluções pensadas para ir além.
              </p>
            </div>
            <div className="solutions-grid">
              {solutions.map((s, i) => {
                const Icon = icons[i];
                return (
                  <a
                    href="#contato"
                    className="solution-card reveal"
                    key={s.title}
                    onPointerMove={(e) => {
                      if (reduced || e.pointerType !== "mouse") return;
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty(
                        "--rx",
                        `${-(e.clientY - r.top - r.height / 2) / 90}deg`,
                      );
                      e.currentTarget.style.setProperty(
                        "--ry",
                        `${(e.clientX - r.left - r.width / 2) / 90}deg`,
                      );
                    }}
                    onPointerLeave={(e) => {
                      e.currentTarget.style.setProperty("--rx", "0deg");
                      e.currentTarget.style.setProperty("--ry", "0deg");
                    }}
                  >
                    <div className="card-top">
                      <Icon size={26} strokeWidth={1} />
                      <span>0{i + 1}</span>
                    </div>
                    <span className="card-tag">{s.tag}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <ArrowUpRight className="card-arrow" size={20} />
                  </a>
                );
              })}
              <a href="#contato" className="solution-invitation reveal">
                <span>O PRÓXIMO PASSO É SEU.</span>
                <h3>
                  Uma ideia diferente?
                  <br />
                  <em>Vamos explorar.</em>
                </h3>
                <span className="circle-arrow">
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </section>
          <section
            ref={method}
            id="metodologia"
            className="section method reveal"
          >
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / DA IDEIA AO IMPACTO</p>
                <h2>
                  Uma visão clara.
                  <br />
                  <em>Uma jornada juntos.</em>
                </h2>
              </div>
              <p>
                Transparência em cada etapa.
                <br />
                Intenção em cada decisão.
              </p>
            </div>
            <div className="timeline">
              <motion.div
                className="timeline-progress"
                style={{ scaleX: reduced ? 1 : timelineScale }}
              />
              {steps.map(([title, text], i) => (
                <article key={title}>
                  <span className="step-number">0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>
          <Projects />
          <section className="section difference reveal">
            <p className="eyebrow">05 / ALÉM DO CÓDIGO</p>
            <div className="difference-grid">
              <h2>
                O detalhe faz
                <br />
                <em>a diferença.</em>
                <span className="editorial-star">✳</span>
              </h2>
              <div>
                {[
                  "Soluções personalizadas",
                  "Design moderno",
                  "Código de qualidade",
                  "Responsividade",
                  "Foco na experiência do usuário",
                  "Tecnologia orientada a resultados",
                ].map((s, i) => (
                  <div className="difference-row" key={s}>
                    <span>0{i + 1}</span>
                    <h3>{s}</h3>
                    <Check size={17} />
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Universe />
          <div className="manifesto reveal">
            <span>07 / NOSSO HORIZONTE</span>
            <p>
              Transformamos ideias
              <br />
              em <em>soluções digitais.</em>
            </p>
            <a href="#contato" aria-label="Começar uma conversa">
              <ArrowDown />
            </a>
          </div>
          <Contact />
        </main>
        <footer className="footer">
          <div className="footer-top">
            <div>
              <Brand />
              <p>Tecnologia que impulsiona o amanhã.</p>
            </div>
            <div>
              <span>EXPLORE</span>
              <a href="#sobre">Sobre nós</a>
              <a href="#solucoes">Soluções</a>
              <a href="#projetos">Projetos conceito</a>
            </div>
            <div>
              <span>CONECTE-SE</span>
              <a href="#contato">
                Começar um projeto <ArrowUpRight size={14} />
              </a>
              {config.socials.map((s) => (
                <a href={s.url} key={s.label} target="_blank" rel="noreferrer">
                  {s.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
            <a href="#inicio" className="back-top">
              Voltar ao topo <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} O.R.I.O.N. Todos os direitos
              reservados.
            </span>
            <span>IMAGINAR. CONECTAR. EVOLUIR.</span>
          </div>
        </footer>
        <AudioControl />
        <PointerEffects />
      </div>
    </MotionConfig>
  );
}
