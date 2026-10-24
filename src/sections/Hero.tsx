import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, ArrowDown, ArrowRight } from "lucide-react";
import Orbital from "../components/three/Orbital";
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <section ref={section} id="inicio" className="hero">
      <div className="hero-grid" />
      <div className="hero-nebula" aria-hidden="true" />
      <motion.div className="hero-orbit" style={{ y: reduced ? 0 : orbitY }}>
        <Orbital />
      </motion.div>
      <div className="hero-content">
        <p className="eyebrow">
          <span className="status-dot" /> ESTÚDIO DE SOFTWARE & EXPERIÊNCIAS
          DIGITAIS
        </p>
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Construímos
          <br />o digital.
          <br />
          <em>
            Impulsionamos
            <br />o amanhã.
          </em>
        </motion.h1>
        <p className="hero-description">
          Transformamos ideias em experiências digitais através da tecnologia,
          criatividade e inovação.
        </p>
        <div className="hero-actions">
          <a className="button gold" href="#contato">
            Começar meu projeto <ArrowUpRight size={18} />
          </a>
          <a className="button plain" href="#solucoes">
            Explorar soluções <ArrowRight size={18} />
          </a>
        </div>
      </div>
      <div className="orbital-caption" aria-hidden="true">
        <span>O.R.I.O.N. / NÚCLEO CRIATIVO</span>
        <i />
        <small>ENGENHARIA EM MOVIMENTO</small>
      </div>
      <div className="hero-bottom">
        <a href="#sobre">
          <span className="scroll-icon">
            <ArrowDown size={15} />
          </span>{" "}
          EXPLORE NOVOS HORIZONTES
        </a>
        <span className="hero-tag">
          IDEIAS HUMANAS. POSSIBILIDADES EXTRAORDINÁRIAS.
        </span>
        <span className="coordinates">01 — 08</span>
      </div>
    </section>
  );
}
