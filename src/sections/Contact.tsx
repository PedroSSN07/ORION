import { type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { config } from "../config/site";

export default function Contact() {
  const reduced = useReducedMotion();
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (reduced || event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  }
  function reset(event: PointerEvent<HTMLAnchorElement>) {
    for (const property of ["--mx", "--my", "--rx", "--ry"])
      event.currentTarget.style.removeProperty(property);
  }
  return (
    <section id="contato" className="contact section">
      <div className="contact-copy">
        <p className="eyebrow">08 / VAMOS CRIAR O PRÓXIMO</p>
        <h2>
          Seu próximo
          <br />
          grande projeto
          <br />
          <em>começa aqui.</em>
        </h2>
        <p>
          Toda grande transformação começa com uma conversa. Compartilhe sua
          ideia diretamente pelo WhatsApp.
        </p>
        <div className="contact-coordinate">
          <span className="status-dot" /> Novas ideias são bem-vindas.
        </div>
      </div>
      <a
        className="whatsapp-panel"
        href={`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(config.whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={move}
        onPointerLeave={reset}
        onPointerCancel={reset}
        aria-label="Conversar com a O.R.I.O.N. pelo WhatsApp (abre em nova aba)"
      >
        <span className="whatsapp-topline">
          <span>O.R.I.O.N. / CONEXÃO DIRETA</span>
          <ArrowUpRight size={18} />
        </span>
        <div className="whatsapp-visual" aria-hidden="true">
          <div className="signal-ring" />
          <div className="signal-ring ring-two" />
          <div className="signal-ring ring-three" />
          <span className="whatsapp-core">
            <MessageCircle size={46} strokeWidth={1.5} />
          </span>
        </div>
        <span className="whatsapp-label">DA SUA IDEIA AO PRÓXIMO PASSO</span>
        <h3>
          Vamos conectar
          <br />
          possibilidades.
        </h3>
        <p>Uma conversa para começar a construir o que vem a seguir.</p>
        <span className="whatsapp-cta">
          Conversar no WhatsApp <ArrowUpRight size={20} />
        </span>
        <span className="whatsapp-footnote">
          Abre em uma nova aba · Sem formulário
        </span>
      </a>
    </section>
  );
}
