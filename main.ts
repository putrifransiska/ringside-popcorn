// Ringside Popcorn ($POPCORN), an entry in make.fun's coin bounty makefun-coin-promo-01.
// The entry is the coin itself; this program only copies LAUNCH.json (the coin's mint and create signature)
// from the repository to the output directory, where the gate reads it. Before copying it checks the two fields
// have the shapes the gate wants, so a broken LAUNCH.json fails here, loudly, instead of silently at grading.
// No network, no clock, no files outside the repository: both runs write the same bytes.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = join(botDir, 'LAUNCH.json');

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;
const fail = (why: string): never => {
  console.error(`LAUNCH.json: ${why}`);
  process.exit(1);
};

let launch: { mint?: unknown; create_signature?: unknown };
try {
  launch = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  fail(`could not be read from ${botDir}: ${(err as Error).message}`);
}
const { mint, create_signature: sig } = launch!;
if (typeof mint !== 'string' || !BASE58.test(mint) || mint.length < 32 || mint.length > 44) {
  fail('mint is not a base58 address of 32 to 44 characters');
}
if (typeof sig !== 'string' || !BASE58.test(sig) || sig.length < 64 || sig.length > 88) {
  fail('create_signature is not a base58 signature of 64 to 88 characters');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'LAUNCH.json'));
