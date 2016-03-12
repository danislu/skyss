'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNextDeparturesFromGeoToLocation = getNextDeparturesFromGeoToLocation;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _xml2js = require('xml2js');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getNearestStop(from) {
    var lat = from.lat;
    var lng = from.lng;

    var maxdist = 250;
    var url = _utils.baseTravelMagicUrl + '/v1NearestStopsXML?y=' + lat + '&x=' + lng + '&maxdist=' + maxdist;

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

                var value = '';
                if (result.stages && result.stages.group && result.stages.group.length > 0) {
                    value = result.stages.group[0].$.n;
                }

                resolve(value);
            });
        });
    });
}

function getNextDeparturesFromGeoToLocation(from, to) {

    return getNearestStop(from).then(function (value) {
        return new Promise(function (resolve, reject) {
            var url = _utils.baseTravelMagicUrl + '/v1SearchXML?From=' + value + '&to=' + to + '&instant=1';

            (0, _request2.default)({
                method: 'get',
                uri: url
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                    return;
                }

                (0, _xml2js.parseString)(body, function (err, result) {
                    if (err) throw { error: err };

                    var trips = result.result.trips[0].trip;
                    var deps = trips.map(function (trip) {
                        var _trip$i$0$$ = trip.i[0].$;
                        var n = _trip$i$0$$.n;
                        var n2 = _trip$i$0$$.n2;
                        var nd = _trip$i$0$$.nd;
                        var l = _trip$i$0$$.l;
                        var tn = _trip$i$0$$.tn;
                        var td = _trip$i$0$$.td;

                        return {
                            trip: trip.$,
                            first: {
                                from: n,
                                to: n2,
                                line_name: nd,
                                line_no: l,
                                kind: tn,
                                travel_time: td
                            }
                        };
                    }).filter(function (d) {
                        return d.first.kind != 'Gange';
                    });

                    resolve(deps);
                });
            });
        });
    });
}

/*
export function getLocation(filter){
    //http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll//v2LocationXML?filter=Danmarks plass&type=1
}
*/
//# sourceMappingURL=travelmagic.js.map
