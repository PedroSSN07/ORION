import test from "node:test";
import assert from "node:assert/strict";
import {
  scrollAudioLevel,
  playTechClick,
  createAmbientTrack,
} from "../src/lib/audio.ts";

test("audio fades monotonically from top to bottom and restores on return", () => {
  assert.equal(scrollAudioLevel(0, 6000, 1000), 1);
  assert.equal(scrollAudioLevel(5000, 6000, 1000), 0.12);
  let last = 1;
  for (let y = 0; y <= 5000; y += 100) {
    const current = scrollAudioLevel(y, 6000, 1000);
    assert.ok(current <= last);
    last = current;
  }
  assert.equal(scrollAudioLevel(0, 6000, 1000), 1);
});
test("audio handles short pages and overscroll", () => {
  assert.equal(scrollAudioLevel(0, 500, 1000), 1);
  assert.equal(scrollAudioLevel(-100, 6000, 1000), 1);
  assert.equal(scrollAudioLevel(9000, 6000, 1000), 0.12);
});
test("technology click schedules two short voices through the shared volume bus", () => {
  const stops = [];
  const connections = [];
  const parameter = {
    setValueAtTime() {},
    exponentialRampToValueAtTime() {},
    linearRampToValueAtTime() {},
  };
  const context = {
    currentTime: 10,
    createOscillator: () => ({
      frequency: parameter,
      connect() {},
      start() {},
      stop(time) {
        stops.push(time);
      },
      disconnect() {},
    }),
    createGain: () => ({
      gain: parameter,
      connect(node) {
        connections.push(node);
      },
      disconnect() {},
    }),
  };
  const master = {};
  playTechClick(context, master);
  assert.equal(stops.length, 2);
  assert.ok(stops.every((time) => time > 10 && time < 10.1));
  assert.ok(connections.every((node) => node === master));
});

test("ambient phrase is bounded, non-silent and loops without an abrupt seam", () => {
  let samples;
  const source = { connect() {}, start() {} };
  const context = {
    sampleRate: 8000,
    createBuffer: (_, length) => {
      samples = new Float32Array(length);
      return { getChannelData: () => samples };
    },
    createBufferSource: () => source,
  };
  createAmbientTrack(context, {});
  assert.equal(source.loop, true);
  assert.ok(samples.some((value) => Math.abs(value) > 0.01));
  assert.ok(
    samples.every((value) => Number.isFinite(value) && Math.abs(value) < 1),
  );
  assert.ok(Math.abs(samples[0] - samples[samples.length - 1]) < 0.01);
});
