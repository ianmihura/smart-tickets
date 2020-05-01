const path = require("path");

module.exports = {
    filenameHashing: false,
    productionSourceMap: false,
    publicPath: './',
    outputDir: path.resolve(__dirname, "../public/ts-lib"),
};
