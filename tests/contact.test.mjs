import test from "node:test";
import assert from "node:assert/strict";
import { sendContact, isFormSubmitEndpoint } from "../src/lib/contact.ts";
const endpoint = "https://formsubmit.co/ajax/test@example.com";
const fields = {
  name: "Teste",
  email: "sender@example.com",
  projectType: "Site",
  message: "Mensagem de teste local",
};

test("FormSubmit request includes recipient route, reply address and subject", async (t) => {
  t.mock.method(globalThis, "fetch", async (url, request) => {
    assert.equal(url, endpoint);
    assert.equal(request.method, "POST");
    const body = JSON.parse(request.body);
    assert.equal(body._replyto, fields.email);
    assert.equal(body._subject, "Novo contato pelo site O.R.I.O.N.");
    assert.equal(body.message, fields.message);
    return Response.json({ success: "true" });
  });
  assert.equal(await sendContact(endpoint, fields), "accepted");
});
test("submission errors and missing acknowledgements never count as accepted", async (t) => {
  for (const reply of [{ success: false }, { success: "false" }, {}, null]) {
    const mock = t.mock.method(globalThis, "fetch", async () =>
      Response.json(reply),
    );
    await assert.rejects(sendContact(endpoint, fields));
    mock.mock.restore();
  }
  t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("error", { status: 500 }),
  );
  await assert.rejects(sendContact(endpoint, fields));
});
test("activation remains distinct from an accepted submission", async (t) => {
  t.mock.method(globalThis, "fetch", async () =>
    Response.json({
      success: true,
      message: "Please activate your form by confirming your email",
    }),
  );
  assert.equal(await sendContact(endpoint, fields), "activation");
});
test("custom backend requires boolean acknowledgement and keeps custom payload", async (t) => {
  t.mock.method(globalThis, "fetch", async (_, request) => {
    assert.deepEqual(JSON.parse(request.body), fields);
    return Response.json({ success: "true" });
  });
  await assert.rejects(sendContact("https://example.com/contact", fields));
  assert.equal(
    isFormSubmitEndpoint("https://formsubmit.co.evil.example/ajax/test"),
    false,
  );
});
test("network failures preserve a rejected state", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Network failed");
  });
  await assert.rejects(sendContact(endpoint, fields));
});
