const metalsmith = require('metalsmith');
const paths = require('./paths')

const msBuilder = new metalsmith(__dirname)
    .clean(true)
    .source(paths.msSrc)
    .destination(paths.msDst);

module.exports = function () {
    msBuilder.build(function(error) {
        if (error) throw error;

        console.log('Metalsmith build was successfull'.magenta);
    })
}