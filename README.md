# Miniprogram Boilerplate

WeChat miniprogram monorepo — Taro (React) main app + native weapp-vite chat subpackage, pnpm workspace.

## Philosophy

`main` uses Taro + NutUI as the foundation, preserving cross-platform capability for future targets (Alipay, ByteDance, H5, etc.).

The AI chat subpackage (`chat`) breaks out of Taro's compilation boundary intentionally — native weapp-vite + TDesign WeChat MiniProgram gives full access to platform-level APIs and components that Taro's abstraction layer cannot expose. This keeps the main app portable while letting the subpackage go native where it matters.

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

> [!NOTE]
> `dev` starts `chat` and `main` in parallel. On first run, `chat` may not be compiled yet when `main`'s watcher fires — run `pnpm build:chat` once beforehand if you see missing artifacts.

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

> [!IMPORTANT]
> The three packages have a hard dependency on build order. Running `pnpm build:main` before the other two will fail or produce stale output.

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
