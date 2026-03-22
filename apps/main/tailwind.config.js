const fs = require('fs')
const path = require('path')
const { getIconCollections, iconsPlugin } = require('@egoist/tailwindcss-icons')

/**
 * Load custom SVG icons from a directory as an Iconify collection.
 * Usage: i-<collectionName>-<filename-without-ext>
 *
 * @param {string} dir - path to SVG directory
 * @param {string} collectionName - prefix used in class names
 */
function loadLocalIcons(dir, collectionName) {
  const icons = {}
  let files = []
  try {
    files = fs.readdirSync(dir)
  } catch {
    return {}
  }
  for (const file of files) {
    if (!file.endsWith('.svg')) continue
    const filePath = path.join(dir, file)
    if (!fs.lstatSync(filePath).isFile()) continue
    const svg = fs.readFileSync(filePath, 'utf-8')
    const body = svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '').trim()
    const name = path.basename(file, '.svg')
    icons[name] = { body, width: 24, height: 24 }
  }
  return { [collectionName]: { icons } }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  corePlugins: {
    // mini-program doesn't need preflight (h5 base styles)
    preflight: false,
  },
  plugins: [
    iconsPlugin({
      collections: {
        // Custom local SVG icons — src/assets/icons/<name>.svg → i-custom-<name>
        ...loadLocalIcons(path.resolve(__dirname, './src/assets/icons'), 'custom'),
        // Iconify icon sets
        ...getIconCollections(['lucide', 'simple-icons']),
      },
    }),
  ],
}
