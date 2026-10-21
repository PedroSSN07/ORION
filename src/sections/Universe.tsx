import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Orbital from "../components/three/Orbital";
import { pillars } from "../config/site";
export default function Universe() {
  const [active, setActive] = useState(0);
  return (
    <section id="universo" className="section universe">
      <div className="universe-title">
        <p className="eyebrow">06 / CONEXÕES QUE NOS MOVEM</p>
        <h2>
          Explore o universo
          <br />
          <em>O.R.I.O.N.</em>
        </h2>
        <p>
          Quatro pilares. Infinitas possibilidades.
          <br />
          Selecione um ponto para conhecer nossa essência.
        </p>
      </div>
      <div className="universe-stage">
        <Orbital interactive onSelect={setActive} />
        <span className="universe-caption">UM UNIVERSO DE POSSIBILIDADES</span>
      </div>
      <div className="pillar-panel">
        <div
          className="pillar-tabs"
          role="tablist"
          aria-label="Pilares da O.R.I.O.N."
        >
          {pillars.map((p, i) => (
            <button
              key={p.name}
              id={`pillar-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="pillar-content"
              tabIndex={active === i ? 0 : -1}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % 4;
                else if (e.key === "ArrowLeft") next = (i + 3) % 4;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 3;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`pillar-tab-${next}`)?.focus();
              }}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              {p.name}
            </button>
          ))}
        </div>
        <div
          id="pillar-content"
          role="tabpanel"
          aria-labelledby={`pillar-tab-${active}`}
          tabIndex={0}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {pillars[active].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
