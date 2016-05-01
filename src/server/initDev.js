import webpack from 'webpack';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHotMiddleware from './middleware/webpack-hot';
import projectConfig from '../../tools/config';
import webpackConfig from '../../tools/webpack/dev.config';
const compiler = webpack(webpackConfig);
const serverOptions = { publicPath: webpackConfig.output.publicPath };
export default class InitDev {
  static init(application) {
    /**
     * WEBPACK CONFIGURATION
     * Use these middlewares to set up hot module reloading via webpack.
     */
    application.use(webpackDevMiddleware(compiler, serverOptions));
    application.use(webpackHotMiddleware(compiler));
  }
}
