import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
test("contact never confirms success without server acknowledgement", () => {
  const source = readFileSync("src/sections/Contact.tsx", "utf8").replace(/\s/g, "");
  assert.match(source, /if\(!response.ok\)throw/);
  assert.match(source, /data.success!==true/);
  assert.match(source, /if\(!config.contactEndpoint\)/);
});
test("all internal navigation targets exist", () => {
  const sources = [
    "src/App.tsx",
    "src/sections/Contact.tsx",
    "src/sections/Universe.tsx",
    "src/sections/Projects.tsx",
    "src/components/layout/Header.tsx",
  ]
    .map((p) => readFileSync(p, "utf8"))
    .join("\n");
  for (const match of sources.matchAll(/href="#([\w-]+)"/g)) {
    assert.ok(sources.includes(`id="${match[1]}"`), `Missing ${match[1]}`);
  }
});

