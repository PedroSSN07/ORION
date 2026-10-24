import test from "node:test";
import assert from "node:assert/strict";
import { validateBrief, buildWhatsAppUrl } from "../src/lib/brief.ts";

const brief = {
  name: "Pessoa Teste", email: "teste@example.com", service: "Desenvolvimento Web",
  description: "Preciso de um site acessível para apresentar meu projeto.", budget: "",
};
test("brief requires meaningful fields and bounds the message size", () => {
  assert.equal(validateBrief(brief), null);
  for (const change of [
    { name: " " }, { email: "invalido" }, { service: "" },
    { description: "curto" }, { description: "a".repeat(1501) },
  ]) assert.ok(validateBrief({ ...brief, ...change }));
});
test("WhatsApp handoff preserves accents and special characters without adding URL parameters", () => {
  const description = "Quero integração & automação? Sim, com segurança #prioridade.";
  const url = new URL(buildWhatsAppUrl("+55 (88) 99664-5739", { ...brief, description }));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5588996645739");
  assert.deepEqual([...url.searchParams.keys()], ["text"]);
  assert.ok(url.searchParams.get("text").includes(description));
  assert.ok(url.searchParams.get("text").includes("Orçamento: A definir"));
});
test("invalid brief or unavailable destination cannot produce a handoff", () => {
  assert.throws(() => buildWhatsAppUrl("123", brief));
  assert.throws(() => buildWhatsAppUrl("5588996645739", { ...brief, email: "" }));
});
