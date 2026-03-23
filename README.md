# Miniprogram Boilerplate

WeChat miniprogram monorepo — Taro (React) main app + native weapp-vite chat subpackage, pnpm workspace.

## Workspace

| Package | Path | Description |
|---------|------|-------------|
| `main` | `apps/main` | Taro + React main app, weapp-tailwindcss, NutUI |
| `chat` | `apps/chat` | Native weapp-vite chat subpackage, TDesign, Tailwind CSS |
| `taro-plugin-inject-subpackage` | `packages/taro-plugin-inject-subpackage` | Taro plugin — injects native subpackage entries into `app.json` and copies chat build artifacts |

## Quick Start

```bash
pnpm install
pnpm build   # plugin → chat → main
pnpm dev     # chat + main watch in parallel
```

## Common Commands

```bash
pnpm build              # full build in dependency order
pnpm build:plugin       # build taro-plugin-inject-subpackage only
pnpm build:chat         # build chat subpackage only
pnpm build:main         # build main app only
pnpm dev                # watch mode (chat + main)
```

## Build Order

The full build must run in this order:

1. **`build:plugin`** — compile `taro-plugin-inject-subpackage` (tsdown → dist)
2. **`build:chat`** — compile native chat subpackage (weapp-vite → `apps/chat/dist`)
3. **`build:main`** — compile Taro main app; the plugin copies `apps/chat/dist` into `apps/main/dist` and injects subpackage entries into `app.json`
