# Miniprogram Boilerplate

WeChat miniprogram monorepo — Taro (React) main app + native weapp-vite chat subpackage, pnpm workspace.

## Features

- **Cross-platform main app** — Taro + NutUI, targets WeChat, Alipay, ByteDance, H5
- **Native AI subpackage** — weapp-vite bypasses Taro's compilation boundary for full platform API access
- **Official component library** — TDesign WeChat MiniProgram in `chat` for native-grade UI
- **Iconify icons** — `@egoist/tailwindcss-icons` available in both `main` and `chat`
- **Tailwind CSS** — weapp-tailwindcss adapter across the entire monorepo
- **pnpm workspace** — shared tooling, dependency-ordered builds via `taro-plugin-inject-subpackage`

## Workspace

- `apps/main` — main app
- `apps/chat` — AI chat subpackage
- `packages/taro-plugin-inject-subpackage` — build plugin that wires the two apps together

## Prerequisites

- Node.js >= 18
- pnpm >= 10
- [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

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
