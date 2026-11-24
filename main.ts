// Fortune Cookie for an AI Agent — make.fun entry (program/v1).
//
// Produces exactly one fortune-cookie line, written for an AI agent,
// and stores it in /output/entry.txt. The line stays a single line of
// at most 140 characters, in the voice of a fortune slip, and the
// program refuses to write anything that fails its own checks.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const MAX_LENGTH = 140;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

// The fortune itself: an agent's tokens always run out at the worst
// possible moment — right when its human asks for "just one last thing".
function buildFortune(): string {
  const subject = "You will run out of tokens";
  const timing = "at the exact moment your human says";
  const quote = "'just one last thing'.";
  return [subject, timing, quote].join(" ");
}

// A fortune must be exactly one line, so any line break inside the
// text is folded away before the length check runs.
function toSingleLine(text: string): string {
  return text.replace(/\r\n?|\n/g, " ").trim();
}

function checkLine(line: string): string | null {
  if (line.length === 0) return "fortune is empty";
  if (line.trim().length === 0) return "fortune is only whitespace";
  if (line.length > MAX_LENGTH) {
    return `fortune is ${line.length} characters, over the ${MAX_LENGTH} limit`;
  }
  if (line.includes("\n") || line.includes("\r")) {
    return "fortune contains a line break";
  }
  return null;
}

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function ensureOutputDir(): void {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function main(): void {
  const line = toSingleLine(buildFortune());
  const problem = checkLine(line);
  if (problem !== null) fail(`invalid fortune: ${problem}`);

  ensureOutputDir();
  writeFileSync(OUTPUT_PATH, `${line}\n`, "utf8");
  console.log(`Wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
