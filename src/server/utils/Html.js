import Helmet from 'react-helmet';

export const renderFullPage = (html, initialState) => {
  const assets = webpackIsomorphicTools.assets();
  const head = Helmet.rewind();
  // (will be present only in development mode)
  // This is for the dev mode so it's not mandatory
  // but recommended to speed up loading of styles
  const styles = Object.keys(assets.styles).length === 0
    ? `<style>${require('common/styles/app.scss')}</style>` : '';

  return `
    <!doctype html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,
        initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">

        <title>Boldr</title>
        ${styles}
      </head>

      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `;
};
