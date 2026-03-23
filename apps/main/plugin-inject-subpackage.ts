/**
 * Taro plugin: inject native subpackages into app.json after compilation,
 * and copy compiled artifacts from apps/chat/dist into apps/main/dist.
 */

import fs from 'fs'
import path from 'path'

const CHAT_DIST = path.resolve(__dirname, '../../chat/dist')
const MAIN_DIST = path.resolve(__dirname, '../dist')

// Directories to copy from apps/chat/dist → apps/main/dist (relative to CHAT_DIST)
const COPY_DIRS = [
  { from: 'pages/sub/chat', to: 'pages/sub/chat' },
  { from: 'miniprogram_npm/tdesign-miniprogram', to: 'miniprogram_npm/tdesign-miniprogram' },
]

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

const NATIVE_SUBPACKAGES = [
  {
    root: 'pages/sub',
    pages: ['chat/index'],
  },
]

function syncChatArtifacts() {
  for (const { from, to } of COPY_DIRS) {
    copyDir(path.join(CHAT_DIST, from), path.join(MAIN_DIST, to))
  }
}

class CopyChatArtifactsPlugin {
  apply(compiler: any) {
    compiler.hooks.beforeRun.tap('CopyChatArtifactsPlugin', syncChatArtifacts)
    compiler.hooks.watchRun.tap('CopyChatArtifactsPlugin', syncChatArtifacts)
  }
}

export default (ctx: any) => {
  ctx.modifyWebpackChain(({ chain }: { chain: any }) => {
    chain.plugin('copy-chat-artifacts').use(CopyChatArtifactsPlugin)
  })

  ctx.modifyBuildAssets(({ assets }: { assets: Record<string, any> }) => {
    const appJsonAsset = assets['app.json']
    if (!appJsonAsset) return

    const source = appJsonAsset.source()
    const appJson = JSON.parse(typeof source === 'string' ? source : source.toString())

    const existing: any[] = appJson.subPackages || appJson.subpackages || []

    for (const pkg of NATIVE_SUBPACKAGES) {
      const found = existing.find((p: any) => p.root === pkg.root && !p.independent)
      if (found) {
        for (const page of pkg.pages) {
          if (!found.pages.includes(page)) {
            found.pages.push(page)
          }
        }
      } else {
        existing.push(pkg)
      }
    }

    appJson.subPackages = existing
    delete appJson.subpackages

    const updated = JSON.stringify(appJson, null, 2)
    assets['app.json'] = {
      source: () => updated,
      size: () => Buffer.byteLength(updated),
    }
  })
}
