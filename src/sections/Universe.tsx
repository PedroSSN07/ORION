import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RotateCcw, Move, LayoutGrid } from "lucide-react";
import Orbital from "../components/three/Orbital";
import { pillars } from "../config/site";
export default function Universe() {
  const [active, setActive] = useState<number | null>(null);
  const [rotate, setRotate] = useState(false);
  const [staticMode, setStaticMode] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const reduced = useReducedMotion();
  const canRotate = !staticMode && !reduced && !unavailable;
  return (
    <section id="universo" className="section universe">
      <div className="universe-title">
        <p className="eyebrow">06 / UM UNIVERSO DE POSSIBILIDADES</p>
        <h2>
          Uma essência.
          <br />
          <em>Quatro dimensões.</em>
        </h2>
        <p>
          Explore o universo O.R.I.O.N. Cada planeta representa uma forma de
          transformar ideias em valor.
        </p>
      </div>
      <div className="universe-stage">
        <Orbital
          interactive
          onSelect={setActive}
          selected={active}
          rotate={rotate && canRotate}
          staticMode={staticMode}
          onUnavailable={setUnavailable}
        />
        <span className="universe-caption">
          {unavailable
            ? "3D INDISPONÍVEL · EXPLORE PELOS CARDS"
            : staticMode || reduced
            ? "MODO ESTÁTICO · EXPLORE PELOS CARDS"
            : rotate
              ? "ARRASTE PARA GIRAR · TOQUE EM UM PLANETA"
              : "SELECIONE UM PLANETA OU EXPLORE PELOS CARDS"}
        </span>
      </div>
      <div className="universe-controls">
        <button
          aria-pressed={rotate && canRotate}
          disabled={!canRotate}
          onClick={() => setRotate(!rotate)}
        >
          <Move size={15} />
          {rotate && canRotate ? "Parar rotação manual" : "Ativar rotação manual"}
        </button>
        <button
          aria-pressed={staticMode}
          onClick={() => {
            setStaticMode(!staticMode);
            setRotate(false);
          }}
        >
          <LayoutGrid size={15} />
          Modo sem 3D
        </button>
        <button
          onClick={() => {
            setActive(null);
            setRotate(false);
          }}
          disabled={active === null && !rotate}
        >
          <RotateCcw size={15} />
          Visão geral
        </button>
      </div>
      <div className="pillar-panel">
        <div className="pillar-cards" aria-label="Pilares da O.R.I.O.N.">
          {pillars.map((p, i) => (
            <button
              key={p.name}
              className={`pillar-card pillar-${i}`}
              aria-pressed={active === i}
              aria-controls="pillar-content"
              onClick={() => setActive(i)}
            >
              <span className="mini-planet" aria-hidden="true" />
              <small>0{i + 1}</small>
              <strong>{p.name}</strong>
              <span>Explorar ↗</span>
            </button>
          ))}
        </div>
        <div
          id="pillar-content"
          className="pillar-description"
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active === null ? "overview" : active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.2 }}
            >
              <h3>
                {active === null
                  ? "Explore uma nova perspectiva."
                  : pillars[active].name}
              </h3>
              <p>
                {active === null
                  ? "Tecnologia, criatividade, inovação e resultados se conectam em cada projeto. Escolha uma dimensão para se aproximar."
                  : pillars[active].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
