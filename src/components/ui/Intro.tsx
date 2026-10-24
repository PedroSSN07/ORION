import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { config } from "../../config/site";
export default function Intro() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    try {
      return sessionStorage.getItem("orion-intro-v2") !== "seen";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem("orion-intro-v2", "seen");
    } catch {
      /* Storage is optional. */
    }
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, [visible]);
  if (!visible || reduced) return null;
  return (
    <div className="intro" aria-label="Abertura O.R.I.O.N.">
      <div className="intro-visual" aria-hidden="true">
        <div className="intro-star" />
        <div className="intro-ring" />
        <img src={config.logo} width="1774" height="887" alt="" />
        <span>UM NOVO HORIZONTE DIGITAL</span>
      </div>
      <button className="intro-skip" onClick={() => setVisible(false)}>
        Ignorar abertura ↗
      </button>
    </div>
  );
}
