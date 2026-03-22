// Injects subPackages into dist/app.json after Taro build
// Run after: taro build --type weapp
import { readFileSync, writeFileSync } from 'fs'

const appJson = JSON.parse(readFileSync('dist/app.json', 'utf-8'))

appJson.subPackages = [
  {
    root: 'packages/chat',
    pages: [
      'pages/index/index',
      'pages/layouts/index',
    ],
    independent: true,
  },
]

writeFileSync('dist/app.json', JSON.stringify(appJson, null, 2))
console.log('✓ subPackages injected into dist/app.json')
