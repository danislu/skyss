'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _chai = require('chai');

var _utils = require('./utils.test');

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var latLng = {
    y: 60.3006106,
    x: 5.304968199999999
};

var maxdist = 100;
var baseUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';
var nearestStop = 'Dortledhaugen (Bergen)';
var dkPlassStopName = 'Danmarks plass (Bergen)';
var lagunenStopName = 'Lagunen (Bergen)';

describe('testing travelmagic api', function () {

    it('should get the nearest stops to this location', function (done) {
        var url = baseUrl + '/v1NearestStopsXML?y=' + latLng.y + '&x=' + latLng.x + '&maxdist=' + maxdist;

        return new Promise(function (resolve) {
            (0, _request2.default)({
                method: 'get',
                uri: url
            }, (0, _utils.asyncCatch)(function (error, response, body) {
                if (error) throw { error: error };

                (0, _chai.expect)(body).to.not.be.null;
                (0, _chai.expect)(body).to.not.be.undefined;
                (0, _chai.expect)(body).to.not.equal('');

                (0, _xml2js.parseString)(body, function (err, result) {
                    if (err) throw { error: err };

                    var firstGroup = result.stages.group[0];
                    (0, _chai.expect)(firstGroup.$.n).to.be.equal(nearestStop);

                    resolve(true);
                });
            }, done));
        });
    });

    it('should get route', function (done) {
        var date = '15.03.2016'; // dd.mm.yyy
        var time = '03.00'; // hh.mm
        var url = baseUrl + '/v1SearchXML?From=' + dkPlassStopName + '&to=' + lagunenStopName + '&instant=1&Date=' + date + '&Time=' + time;

        return new Promise(function (resolve) {
            (0, _request2.default)({
                method: 'get',
                uri: url
            }, (0, _utils.asyncCatch)(function (error, response, body) {
                if (error) throw { error: error };

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
                    //console.log(deps);

                    resolve(deps);
                });
            }, done));
        });
    });
});
//# sourceMappingURL=travelmagicapi.tests.js.map
