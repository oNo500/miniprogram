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

## Workflows

### Full Build

The full build must run in dependency order:

```bash
pnpm build:plugin   # 1. compile taro-plugin-inject-subpackage (tsdown → dist)
pnpm build:chat     # 2. compile native chat subpackage (weapp-vite → apps/chat/dist)
pnpm build:main     # 3. compile Taro main app — plugin copies chat artifacts into
                    #    apps/main/dist and injects subpackage entries into app.json
```

Or run all at once:

```bash
pnpm build
```
