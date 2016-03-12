'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getNextDeparturesFromGeoToLocation = getNextDeparturesFromGeoToLocation;
exports.getSuggestions = getSuggestions;

var _utils = require('./utils');

function getNearestStop(from) {
    var x = from.x;
    var y = from.y;

    var maxdist = 250;
    var url = _utils.baseTravelMagicUrl + '/v1NearestStopsXML?y=' + y + '&x=' + x + '&maxdist=' + maxdist;

    return (0, _utils.getXmlToJson)(url, function (result, resolve) {

        var value = '';
        if (result.stages && result.stages.group && result.stages.group.length > 0) {
            value = result.stages.group[0].$.n;
        }

        resolve(value);
    });
}

function getNextDeparturesFromGeoToLocation(fromCoords, to) {
    return getNearestStop(fromCoords).then(function (value) {
        var url = _utils.baseTravelMagicUrl + '/v1SearchXML?From=' + value + '&to=' + to + '&instant=1';

        return (0, _utils.getXmlToJson)(url, function (result, resolve) {
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
}

function getSuggestions(filter) {
    var url = _utils.baseTravelMagicUrl + '/v2LocationXML?filter=' + filter + '&type=1';

    return (0, _utils.getXmlToJson)(url, function (result, resolve) {
        resolve(result.stages.i.map(function (i) {
            return i.$.n;
        }));
    });

    //http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll//v2LocationXML?filter=Danmarks plass&type=1
}
//# sourceMappingURL=skyss.js.map
