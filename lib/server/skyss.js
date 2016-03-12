'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNextDeparturesFromGeoToLocation = undefined;

var _travelmagic = require('./travelmagic');

Object.defineProperty(exports, 'getNextDeparturesFromGeoToLocation', {
    enumerable: true,
    get: function get() {
        return _travelmagic.getNextDeparturesFromGeoToLocation;
    }
});
exports.getNextDeparture = getNextDeparture;
exports.getDepartures = getDepartures;

var _request = require('request');

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _lodash = require('lodash');

var _parser = require('./parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_momentTimezone2.default.locale('nb');
var baseTravelMagicUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';

function getUrl(_ref) {
    var from1 = _ref.from1;
    var to1 = _ref.to1;
    var _ref$now = _ref.now;
    var now = _ref$now === undefined ? 1 : _ref$now;
    var _ref$buss = _ref.buss;
    var buss = _ref$buss === undefined ? 1 : _ref$buss;
    var _ref$expressbuss = _ref.expressbuss;
    var expressbuss = _ref$expressbuss === undefined ? 1 : _ref$expressbuss;
    var _ref$lang = _ref.lang;
    var lang = _ref$lang === undefined ? 'en' : _ref$lang;

    return baseTravelMagicUrl + '/svar?referrer=&lang=' + lang + '&dep1=&theme=&from=' + from1 + '&to=' + to1 + '&Time=&Date=&now=' + now + '&direction=1&search=S%C3%B8k&GetTR0=' + buss + '&GetTR1=' + expressbuss + '&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=';
}

function getNextDeparture(options) {
    return new Promise(function (resolve, reject) {
        getDepartures(options).then(function (data) {
            resolve((0, _lodash.first)(data));
        }).catch(function (e) {
            reject(e);
        });
    });
}

function getDepartures(_ref2) {
    var from = _ref2.from;
    var to = _ref2.to;

    return new Promise(function (resolve, reject) {
        var url = getUrl({
            from1: encodeURIComponent(from),
            to1: encodeURIComponent(to)
        });

        (0, _request.get)(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve((0, _parser.parseHtmlData)(body).map(function (time) {
                    return {
                        time: time,
                        when: _momentTimezone2.default.tz(time, 'hh:mm', 'Europe/Oslo').fromNow()
                    };
                }));
            } else {
                reject({
                    message: 'the error',
                    error: error
                });
            }
        });
    });
}
//# sourceMappingURL=skyss.js.map
