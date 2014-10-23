"use strict";

require('./lib/patch');

var path = require('path');

module.exports = explorer;

/**
 * Example usage:
 *
 * var explorer = require('sira-express-explorer');
 * app.use('/explorer', explorer(sapp, options));
 */
function explorer(sapp, options) {
    options = options || {};
    options.swaggerDistRoot = options.swaggerDistRoot || path.join(__dirname, 'public');
    return require('loopback-explorer')(buildLoopbackApplication(sapp), options);
}

function buildLoopbackApplication(sapp) {
    var loopbackApplication = {
        get: function () {
            return sapp.get.apply(sapp, arguments);
        },
        models: sapp.models,
        remotes: function () {
            return sapp.remotes;
        }
    };
//    Object.defineProperty(loopbackApplication, 'models', sapp.models);
    return loopbackApplication;
}