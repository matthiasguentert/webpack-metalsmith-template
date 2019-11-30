const bs                    = require('browser-sync').create();
const webpack               = require('webpack');
const webpackDevMiddleware  = require('webpack-dev-middleware');
const stripAnsi             = require('strip-ansi');
const msBuilder             = require('./metalsmith-builder')
const paths                 = require('./paths');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require(paths.wpConfig);
var bundler       = webpack(webpackConfig);

/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return bs.sockets.emit('fullscreen:message', {
            title: "Webpack Error:",
            body:  stripAnsi(stats.toString()),
            timeout: 100000
        });
    }
    bs.reload();
});

/**
 * In case something has changed within the 
 * metalsmith content folder, do a rebuild and reload
 */
bs.watch(paths.msSrc, function(event, file) {
    msBuilder()
    bs.reload();
})

/**
 * Initialize browsersync and attach middleware to it
 */
bs.init({
    watch: true, 
    server: paths.dist,
    open: true, 
    logFileChanges: true, 
    middleware: [
        webpackDevMiddleware(bundler, {
            publicPath: webpackConfig.output.publicPath,
            stats: {colors: true}
        })
    ],
    plugins: ['bs-fullscreen-message'],
    files: ['dist/**/*']
});