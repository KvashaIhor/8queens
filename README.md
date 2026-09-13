# 8queens

An interactive eight queens puzzle. Place queens on the board and it highlights
conflicts live — red for a queen under attack, green for one safely placed —
with a backtracking solver that will finish the board for you.

**[Live demo](https://8queens-beta.vercel.app)**

## Running it

```bash
pnpm install
pnpm dev
```

## What's here

- `components/eight-queens-game.tsx` — board state, conflict detection across
  rows, columns and both diagonals, and the backtracking solver
- `app/page.tsx` — page shell and animated shader background
- `components/ui/` — shadcn/ui components

Next.js, TypeScript, Tailwind.
