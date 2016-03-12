'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.baseTravelMagicUrl = exports.HOLDEPLASSER = undefined;
exports.getXmlToJson = getXmlToJson;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOLDEPLASSER = exports.HOLDEPLASSER = {
    Danmarksplass: 'Danmarks plass (Bergen)',
    Lagunen: 'Lagunen (Bergen)',
    Dortledhaugen: 'Dortledhaugen (Bergen)'
};

var baseTravelMagicUrl = exports.baseTravelMagicUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';

function getXmlToJson(url, fn) {
    return new Promise(function (resolve, reject) {
        (0, _request2.default)({
            method: 'get',
            uri: url
        }, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }

            (0, _xml2js.parseString)(body, function (err, result) {
                if (err) {
                    reject(err);
                    return;
                }

                fn(result, resolve, reject);
            });
        });
    });
}
//# sourceMappingURL=utils.js.map
