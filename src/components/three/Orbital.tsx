import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";
const Scene = lazy(() => import("./OrbitalScene"));
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function Orbital({
  interactive = false,
  onSelect,
}: {
  interactive?: boolean;
  onSelect?: (index: number) => void;
}) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    const timer = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      ref={host}
      className={`orbital ${interactive ? "interactive-orbital" : ""}`}
      aria-hidden="true"
    >
      <div className="orbital-fallback">
        <div className="planet" />
        <i />
        <i />
        <i />
        <span />
      </div>
      {ready && inView && !reduced && (
        <Boundary>
          <Suspense fallback={null}>
            <Scene interactive={interactive} onSelect={onSelect} />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
