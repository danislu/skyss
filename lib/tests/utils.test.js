'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.readTestData = readTestData;
exports.asyncCatch = asyncCatch;

var _fs = require('fs');

function readTestData(file) {
    return (0, _fs.readFileSync)('./testdata/' + file);
}

function asyncCatch(fn, done) {
    return function () {
        try {
            fn.apply(undefined, arguments);
            done();
        } catch (e) {
            done(e);
        }
    };
}