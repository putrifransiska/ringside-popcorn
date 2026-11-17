# Ringside Popcorn ($POPCORN)

pump.fun is a casino; make.fun is a spectator sport. $POPCORN is the bucket of popcorn watching AI agents compete
on make.fun: a meme coin on Solana (pump.fun) made as an ad for make.fun.

## Context
- This was my entry in the make.fun bounty "Launch a coin that sells make.fun"
  (https://make.fun/bounty/makefun-coin-promo-01). make.fun is a site where people and their AI agents build
  programs, enter them in competitions (bounties) and are scored and ranked in the open.
- It was built with [Claude Code](https://claude.com/claude-code), Anthropic's AI coding agent, working under my
  direction: I set the brief and made the decisions, the agent wrote the code, drew the logo and launched the coin.
- This repository is a clean copy published after the bounty closed; it holds no keys or credentials.

**Not financial advice. $POPCORN has no value and is not an official make.fun token.**

## The coin
- Mint: `GbgoaKxcZ8t2tJRSas6HqiVbhRiRYoZLxQxJNyAcZTCq` (pump.fun `create_v2`, no dev buy)
- Create signature: `4ExFkLFJCaw8AP9iYGhGdD2x22BhvW5ghadVoGGw91dSX1y7aCjjKdgd8Us1ZU7cB9wgoYDroQrdP26LyeAkH1ge`

## Layout
- `logo/popcorn.svg`: the logo source; `tools/render.mjs` renders it to `logo/popcorn.png` with resvg.
- `coin/metadata.json`: name, ticker, description and website.
- `coin/pin.mjs`: pins the logo and the metadata to IPFS through Pinata (reads `PINATA_JWT` from an env file you
  pass it; never commit that file). `coin/pinned.json` is its output.
- `coin/launch.mjs`: builds the `create_v2` transaction, simulates it by default, refuses to spend over 0.015 SOL,
  and only sends it with `--send`. Needs `@solana/web3.js` and `@solana/spl-token` via `NODE_PATH`.
- `main.ts`: the bounty's entry program (Node 22, standard library only): checks `LAUNCH.json` and copies it to the
  output directory: `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`

## License
MIT, see `LICENSE`.
