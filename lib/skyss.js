'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HOLDEPLASSER = undefined;
exports.getData = getData;

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOLDEPLASSER = exports.HOLDEPLASSER = {
    Danmarksplass: 'Danmarks plass (Bergen)',
    Lagunen: 'Lagunen (Bergen)',
    Dortlehaugen: 'Dortledhaugen (Bergen)'
};

function getData(from, to) {
    var url = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll/' + 'svar?referrer=&lang=en&dep1=&theme=' + ('&from=' + from) + ('&to=' + to) + '&Time=22%3A13&Date=22.02.2016' + '&now=1' + '&direction=1&search=Search&adv=1&GetTR0=1&GetTR1=1&GetTR5=1&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=';

    return new Promise(function (resolve, reject) {
        _http2.default.get(url, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                resolve(data);
            });
        }, reject);
    });
}

/*
http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll/svar?lang=en&from=Dortledhaugen+%28Bergen%29&to=Lagunen+%28Bergen%29&now=1&direction=1&search=Search&adv=1&GetTR0=1&GetTR1=1&GetTR5=1&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=
*/
//# sourceMappingURL=skyss.js.map
