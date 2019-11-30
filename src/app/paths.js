const { join, resolve } = require('path');

const root = resolve(__dirname, '..', '..');

module.exports = {
    root, 
    dist: join(root, 'dist'),

    // Metalsmith folders
    msSrc: join(root, 'content'),
    msDst: join(root, 'ms-build'),

    // Webpack folders
    wpConfig: join(root, 'webpack.config.js'),
}
