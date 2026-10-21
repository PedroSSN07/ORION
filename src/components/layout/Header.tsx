import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { config } from "../../config/site";
export function Brand({ full = false }: { full?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label="O.R.I.O.N. início">
      {config.logo ? (
        <span className={full ? "brand-full" : "brand-custom"}>
          <img src={config.logo} alt="O.R.I.O.N." width="1774" height="887" />
        </span>
      ) : (
        <span>
          O.R.I.O.N<span className="brand-dot">.</span>
        </span>
      )}
    </a>
  );
}
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Brand full />
      <nav
        aria-label="Navegação principal"
        className={open ? "nav open" : "nav"}
        id="navigation"
      >
        {[
          ["sobre", "Sobre nós"],
          ["solucoes", "Soluções"],
          ["projetos", "Projetos"],
        ].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contato" onClick={() => setOpen(false)}>
          Vamos conversar <ArrowUpRight size={16} />
        </a>
      </nav>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
