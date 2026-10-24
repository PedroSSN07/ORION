import { useState } from "react";
import { ArrowUpRight, X, ArrowRight } from "lucide-react";
import { projects } from "../config/projects";
export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="projetos" className="section projects">
      <div className="section-heading">
        <div>
          <p className="eyebrow">04 / POSSIBILIDADES EM PRÁTICA</p>
          <h2>
            Projetos que transformam
            <br />
            ideias em <em>experiências.</em>
          </h2>
        </div>
        <p>
          Uma janela para o que podemos criar.
          <br />
          Explorações autorais de design e tecnologia.
        </p>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <button
            className="project-card"
            key={p.name}
            onClick={() => setSelected(i)}
            aria-haspopup="dialog"
          >
            <div className={`project-art ${p.theme}`}>
              <span className="concept-label">PROJETO CONCEITO</span>
              {i === 0 ? (
                <div className="dashboard">
                  <aside>
                    atlas<span>◈</span>
                    <small>
                      Visão geral
                      <br />
                      <br />
                      Atividade
                      <br />
                      <br />
                      Relatórios
                    </small>
                  </aside>
                  <div className="dash-main">
                    <p>
                      Visão geral <span>↗</span>
                    </p>
                    <div className="dash-stats">
                      <div>
                        <small>Receita ilustrativa</small>
                        <strong>R$ 48.250</strong>
                      </div>
                      <div>
                        <small>Crescimento</small>
                        <strong>+24,8%</strong>
                      </div>
                    </div>
                    <div className="chart">
                      {[25, 39, 32, 58, 45, 67, 54, 79, 70, 90, 76, 98].map(
                        (h, n) => (
                          <i key={n} style={{ height: `${h}%` }} />
                        ),
                      )}
                    </div>
                    <small>DADOS DEMONSTRATIVOS</small>
                  </div>
                </div>
              ) : (
                <div className="architecture">
                  <div className="building">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>
                    forma<span>®</span>
                  </span>
                  <p>
                    O espaço.
                    <br />A essência.
                    <br />O extraordinário.
                  </p>
                  <small>ARQUITETURA EM PERSPECTIVA — ESTUDO AUTORAL</small>
                </div>
              )}
              <div
                className={`project-phone phone-${p.theme}`}
                aria-hidden="true"
              >
                <i />
                <span>{p.name}</span>
                <div className="phone-display">
                  <b />
                  <b />
                  <b />
                </div>
                <small>ESTUDO MOBILE</small>
              </div>
            </div>
            <div className="project-meta">
              <div>
                <span>{p.kind}</span>
                <h3>
                  {p.name}{" "}
                  <small>
                    — {i === 0 ? "Dados com direção" : "Menos, com significado"}
                  </small>
                </h3>
              </div>
              <ArrowUpRight />
            </div>
          </button>
        ))}
      </div>
      {selected !== null && (
        <dialog
          open
          className="project-dialog"
          ref={(el) => {
            if (el && !el.matches(":modal")) {
              el.close();
              el.showModal();
            }
          }}
          onCancel={() => setSelected(null)}
          aria-labelledby="project-title"
        >
          <button
            className="dialog-close"
            autoFocus
            aria-label="Fechar detalhes"
            onClick={() => setSelected(null)}
          >
            <X />
          </button>
          <p className="eyebrow">
            PROJETO CONCEITO / {projects[selected].name}
          </p>
          <h2 id="project-title">{projects[selected].title}</h2>
          <p>{projects[selected].description}</p>
          <h3 className="project-scope">O que este conceito explora</h3>
          <ul className="project-features">
            {projects[selected].features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <div className="tags">
            {projects[selected].tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <a
            href="#contato"
            className="text-link"
            onClick={() => setSelected(null)}
          >
            Criar algo assim <ArrowRight size={18} />
          </a>
        </dialog>
      )}
    </section>
  );
}
