import { ROOT_DIR, SASS_DIR } from 'config/paths'
import cssModulesHook from 'css-modules-require-hook'
import sass from 'node-sass'
import loaderUtils from 'loader-utils'
import autoprefixer from 'autoprefixer'
import Debug from 'debug';
const debug = Debug('cssMod:');

debug('Building CSS-modules for all .scss and .css files')
cssModulesHook({
  extensions: [ '.scss', '.css' ],
  prepend: [ autoprefixer({ browsers: [ 'last 2 versions' ] }) ],
  generateScopedName(exportedName, exportedPath) {
    const path = exportedPath
      .replace(`${ROOT_DIR}/`, '')
      .replace(/^\//, '')
      .replace(/\.s?css$/, '')
      .replace(/\/|\./g, '-')
    return `${path}-${exportedName}`
  },
  preprocessCss(css, filename) {
    return sass.renderSync({
      includePaths: [ `${ROOT_DIR}/node_modules`, SASS_DIR ],
      data: css,
      file: filename,
      importer(url) {
        return { file: loaderUtils.urlToRequest(url) }
      },
    }).css
  },
})
