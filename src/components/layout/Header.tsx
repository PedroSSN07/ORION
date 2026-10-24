import { useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { config } from "../../config/site";
const links = [
  ["sobre", "Essência"],
  ["solucoes", "Soluções"],
  ["projetos", "Projetos"],
  ["universo", "Universo"],
];
export function Brand({ full = false, onClick }: { full?: boolean; onClick?: () => void }) {
  return (
    <a className="brand" href="#inicio" aria-label="O.R.I.O.N. início" onClick={onClick}>
      <span className={full ? "brand-full" : "brand-custom"}>
        <img src={config.logo} alt="O.R.I.O.N." width="1774" height="887" />
      </span>
    </a>
  );
}
export default function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const update = () =>
      header.current?.classList.toggle("scrolled", window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const close = () => {
      if (window.innerWidth > 760) dialog.current?.close();
    };
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", close);
    };
  }, []);
  return (
    <header className="header" ref={header}>
      <Brand full />
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
        <a className="nav-cta" href="#contato">
          Vamos criar <ArrowUpRight size={17} />
        </a>
      </nav>
      <button
        className="menu-toggle"
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}
      >
        <Menu />
      </button>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu de navegação"
      >
        <div className="mobile-menu-top">
          <Brand onClick={() => dialog.current?.close()} />
          <button
            autoFocus
            aria-label="Fechar menu"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {links.map(([id, label], i) => (
            <a key={id} href={`#${id}`} onClick={() => dialog.current?.close()}>
              <small>0{i + 1}</small>
              {label}
              <ArrowUpRight />
            </a>
          ))}
          <a href="#contato" onClick={() => dialog.current?.close()}>
            Começar meu projeto <ArrowUpRight />
          </a>
        </nav>
        <p>Tecnologia que impulsiona o amanhã.</p>
      </dialog>
    </header>
  );
}
