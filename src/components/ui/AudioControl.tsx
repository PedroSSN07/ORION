import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  createAmbientTrack,
  playTechClick,
  scrollAudioLevel,
} from "../../lib/audio";

type SoundEngine = {
  context: AudioContext;
  master: GainNode;
  sources: AudioScheduledSourceNode[];
};

export default function AudioControl() {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolume] = useState(0.45);
  const [error, setError] = useState("");
  const audio = useRef<SoundEngine | null>(null);
  const pending = useRef(false);

  useEffect(
    () => () => {
      audio.current?.sources.forEach((o) => o.stop());
      void audio.current?.context.close();
      audio.current = null;
    },
    [],
  );

  useEffect(() => {
    const engine = audio.current;
    if (!engine) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const depth = scrollAudioLevel(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight,
      );
      const target = enabled && !document.hidden ? volume * depth : 0;
      engine.master.gain.setTargetAtTime(
        target,
        engine.context.currentTime,
        0.12,
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", update);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", update);
      observer.disconnect();
    };
  }, [enabled, volume]);

  useEffect(() => {
    if (!enabled) return;

    const chime = () => {
      const engine = audio.current;
      if (!engine || engine.context.state !== "running" || document.hidden)
        return;
      playTechClick(engine.context, engine.master);
    };
    document.addEventListener("click", chime, true);
    return () => document.removeEventListener("click", chime, true);
  }, [enabled]);

  async function toggle() {
    if (pending.current) return;
    pending.current = true;
    try {
      if (!audio.current) {
        const context = new AudioContext();
        const master = context.createGain();
        const ambient = context.createGain();
        master.gain.value = 0;
        ambient.gain.value = 0.025;
        ambient.connect(master);
        master.connect(context.destination);
        const track = createAmbientTrack(context, ambient);
        audio.current = { context, master, sources: [track] };
      }
      await audio.current.context.resume();
      setEnabled((value) => !value);
      setError("");
      if (!enabled) playTechClick(audio.current.context, audio.current.master);
    } catch {
      setError("Áudio indisponível neste navegador.");
    } finally {
      pending.current = false;
    }
  }

  return (
    <div className="sound-control">
      <button
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={
          enabled
            ? "Desativar áudio e sons dos cliques"
            : "Ativar áudio e sons dos cliques"
        }
      >
        {enabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        <span>ÁUDIO {enabled ? "ON" : "OFF"}</span>
      </button>
      {enabled && (
        <input
          aria-label="Volume máximo do áudio"
          aria-describedby="audio-depth-note"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
        />
      )}
      <span id="audio-depth-note" className="sr-only">
        O som é mais forte no topo e diminui gradualmente ao descer a página. Ao
        voltar ao topo, o volume aumenta novamente.
      </span>
      <span className="sr-only" role="status">
        {error}
      </span>
    </div>
  );
}
