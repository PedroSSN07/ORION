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
class Boundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function Orbital({
  interactive = false,
  onSelect,
  selected = null,
  rotate = false,
  staticMode = false,
  onUnavailable,
}: {
  interactive?: boolean;
  onSelect?: (index: number) => void;
  selected?: number | null;
  rotate?: boolean;
  staticMode?: boolean;
  onUnavailable?: (unavailable: boolean) => void;
}) {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    onUnavailable?.(failed);
  }, [failed, onUnavailable]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!inView || reduced || ready || staticMode || failed) return;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      if (!gl) {
        setFailed(true);
        return;
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setFailed(true);
      return;
    }
    const timer = setTimeout(() => setReady(true), 350);
    return () => clearTimeout(timer);
  }, [inView, reduced, ready, staticMode, failed]);
  return (
    <div
      ref={host}
      className={`orbital ${interactive ? "interactive-orbital" : ""} ${rotate ? "can-rotate" : ""} ${staticMode ? "static-orbital" : ""}`}
      aria-hidden="true"
    >
      <div className="orbital-fallback">
        <div className="planet" />
        <i />
        <i />
        <i />
        <span />
      </div>
      {ready && !reduced && !staticMode && !failed && (
        <Boundary onFailure={() => setFailed(true)}>
          <Suspense fallback={null}>
            <Scene
              active={inView}
              interactive={interactive}
              onSelect={onSelect}
              selected={selected}
              rotate={rotate}
              onFailure={() => setFailed(true)}
            />
          </Suspense>
        </Boundary>
      )}
    </div>
  );
}
