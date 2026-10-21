/** Normalized page depth: full level at the top, 12% at the bottom. */
export function scrollAudioLevel(
  scrollY: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  const distance = Math.max(0, documentHeight - viewportHeight);
  const progress = distance ? Math.min(1, Math.max(0, scrollY / distance)) : 0;
  return Math.pow(0.12, progress);
}

export function playTechClick(context: AudioContext, destination: AudioNode) {
  const start = context.currentTime;
  // A soft, compact digital tap without the previous high-pitched sweep.
  const voices = [
    {
      frequency: 680,
      end: 440,
      delay: 0,
      duration: 0.055,
      level: 0.12,
      type: "sine" as OscillatorType,
    },
    {
      frequency: 1020,
      end: 880,
      delay: 0.012,
      duration: 0.045,
      level: 0.025,
      type: "sine" as OscillatorType,
    },
  ];
  voices.forEach((voice) => {
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const time = start + voice.delay;
    oscillator.type = voice.type;
    oscillator.frequency.setValueAtTime(voice.frequency, time);
    oscillator.frequency.exponentialRampToValueAtTime(
      voice.end,
      time + voice.duration,
    );
    envelope.gain.setValueAtTime(0, time);
    envelope.gain.linearRampToValueAtTime(voice.level, time + 0.004);
    envelope.gain.exponentialRampToValueAtTime(0.0001, time + voice.duration);
    oscillator.connect(envelope);
    envelope.connect(destination);
    oscillator.start(time);
    oscillator.stop(time + voice.duration + 0.01);
    oscillator.onended = () => {
      oscillator.disconnect();
      envelope.disconnect();
    };
  });
}

/** Original, seamless ambient phrase: sparse soft notes, no continuous bass drone. */
export function createAmbientTrack(
  context: AudioContext,
  destination: AudioNode,
) {
  const duration = 32;
  const buffer = context.createBuffer(
    1,
    context.sampleRate * duration,
    context.sampleRate,
  );
  const samples = buffer.getChannelData(0);
  const notes = [
    220, 329.63, 440, 329.63, 261.63, 392, 523.25, 392, 174.61, 261.63, 349.23,
    261.63, 196, 293.66, 392, 293.66,
  ];
  const noteLength = Math.floor(context.sampleRate * 4);
  notes.forEach((frequency, index) => {
    const offset = Math.floor(index * 2 * context.sampleRate);
    for (let sample = 0; sample < noteLength; sample++) {
      const time = sample / context.sampleRate;
      const envelope =
        (1 - Math.exp(-time * 5)) *
        Math.exp(-time * 1.3) *
        Math.pow(1 - time / 4, 2);
      const tone =
        Math.sin(2 * Math.PI * frequency * time) +
        0.12 * Math.sin(4 * Math.PI * frequency * time);
      samples[(offset + sample) % samples.length] += tone * envelope * 0.65;
    }
  });
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.connect(destination);
  source.start();
  return source;
}
