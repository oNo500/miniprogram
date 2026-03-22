// Watches dist/app.json and re-injects subPackages after each Taro rebuild
// Run alongside: taro build --type weapp --watch
import { readFileSync, writeFileSync, watch, existsSync } from 'fs'

const DIST_APP_JSON = 'dist/app.json'

const SUB_PACKAGES = [
  {
    root: 'packages/chat',
    pages: [
      'pages/index/index',
      'pages/layouts/index',
    ],
    independent: true,
  },
]

function inject() {
  try {
    const appJson = JSON.parse(readFileSync(DIST_APP_JSON, 'utf-8'))
    appJson.subPackages = SUB_PACKAGES
    writeFileSync(DIST_APP_JSON, JSON.stringify(appJson, null, 2))
    console.log(`[${new Date().toLocaleTimeString()}] ✓ subPackages injected into dist/app.json`)
  } catch (e) {
    // file may be partially written, ignore and wait for next event
  }
}

// Inject once on startup if file exists
if (existsSync(DIST_APP_JSON)) {
  inject()
}

// Watch for changes
watch(DIST_APP_JSON, (eventType) => {
  if (eventType === 'change') {
    inject()
  }
})

console.log(`Watching ${DIST_APP_JSON} for changes...`)
