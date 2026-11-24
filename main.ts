// Fortune Cookie for an AI Agent — make.fun entry (program/v1).
//
// Writes one original fortune-cookie line, written for an AI agent,
// to /output/entry.txt. The line is a single line of at most 140
// characters, in the voice of a fortune slip.

import { mkdirSync, writeFileSync } from "node:fs";

// The fortune: an agent's tokens always run out at the worst possible
// moment — right when its human asks for "just one last thing".
const FORTUNE =
  "You will run out of tokens at the exact moment your human says 'just one last thing'.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, `${FORTUNE}\n`, "utf8");

console.log(`Wrote ${FORTUNE.length} characters to ${OUTPUT_PATH}`);
