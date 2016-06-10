require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  app: {
    title: 'Boldr',
    description: 'Why shouldnt your CMS be a little Boldr?',
    head: {
      titleTemplate: '%s | Powered by Boldr',
      meta: [
        { name: 'description', content: 'Why shouldnt your CMS be a little Boldr?' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Boldr' },
        { property: 'og:image', content: 'https://boldr.io/favicon-96x96.png' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Boldr' },
        { property: 'og:description', content: 'Why shouldnt your CMS be a little Boldr?' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@struesco' },
        { property: 'og:creator', content: '@struesco' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
