/**
 * Taro plugin: inject native subpackages into app.json after compilation.
 * These packages are copied from apps/chat/dist and bypass Taro compilation.
 */

const NATIVE_SUBPACKAGES = [
  {
    root: 'pages/sub',
    pages: ['chat/index'],
  },
]

export default (ctx: any) => {
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
