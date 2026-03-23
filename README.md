# 小程序脚手架

微信小程序 monorepo —— Taro (React) 主包 + 原生 weapp-vite AI 对话分包，pnpm workspace 管理。

## 特性

- **跨端主包** —— Taro + NutUI，支持微信、支付宝、字节、H5 等多端
- **原生 AI 分包** —— weapp-vite 绕过 Taro 编译边界，直接访问平台级 API
- **官方组件库** —— 分包使用 TDesign 微信小程序版，充分释放原生能力
- **Iconify 图标** —— 主包与分包均通过 `@egoist/tailwindcss-icons` 使用全量 Iconify 图标集
- **Tailwind CSS** —— weapp-tailwindcss 适配器覆盖整个 monorepo
- **pnpm workspace** —— 统一工具链，通过 `taro-plugin-inject-subpackage` 作为补充将分包添加到主包，保证构建顺序

## 包结构

- `apps/main` —— 主包
- `apps/chat` —— AI 对话分包
- `packages/taro-plugin-inject-subpackage` —— 将两个应用串联的构建插件

## 环境要求

- Node.js >= 18
- pnpm >= 10
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 快速开始

```bash
pnpm install
pnpm build   # 依次构建 plugin → chat → main
pnpm dev     # chat 与 main 并行监听
```

> [!NOTE]
> `dev` 并行启动 `chat` 和 `main`。首次运行时 `chat` 可能尚未编译完成，建议先执行一次 `pnpm build:chat`。

## 常用命令

```bash
pnpm build              # 按依赖顺序完整构建
pnpm build:plugin       # 仅构建 taro-plugin-inject-subpackage
pnpm build:chat         # 仅构建 chat 分包
pnpm build:main         # 仅构建主包
pnpm dev                # 监听模式（chat + main）
```

## 工作流

### 完整构建

> [!IMPORTANT]
> 三个包之间存在硬性构建顺序依赖，在其他两个包构建完成前执行 `pnpm build:main` 会失败或产生过期产物。

```bash
pnpm build:plugin   # 1. 编译 taro-plugin-inject-subpackage（tsdown → dist）
pnpm build:chat     # 2. 编译原生分包（weapp-vite → apps/chat/dist）
pnpm build:main     # 3. 编译主包——插件将 chat 产物复制到 apps/main/dist
                    #    并向 app.json 注入分包条目
```

或一键执行：

```bash
pnpm build
```
