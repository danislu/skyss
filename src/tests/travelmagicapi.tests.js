
import request from 'request';
import { expect } from 'chai';
import { asyncCatch } from './utils.test';
import { parseString } from 'xml2js';

const latLng = {
    y: 60.3006106,
    x: 5.304968199999999
};

const maxdist = 100;
const baseUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';
const nearestStop = 'Dortledhaugen (Bergen)';
const dkPlassStopName = 'Danmarks plass (Bergen)';
const lagunenStopName = 'Lagunen (Bergen)';

describe('testing travelmagic api', function() {

    it('should get the nearest stops to this location', function(done){
        const url = `${baseUrl}/v1NearestStopsXML?y=${latLng.y}&x=${latLng.x}&maxdist=${maxdist}`;

        return new Promise((resolve)=> {
            request({
                method: 'get',
                uri: url
            }, asyncCatch((error, response, body) => {
                if (error) throw { error: error };

                expect(body).to.not.be.null;
                expect(body).to.not.be.undefined;
                expect(body).to.not.equal('');

                parseString(body, (err, result)=> {
                    if (err) throw { error: err };

                    const firstGroup = result.stages.group[0];
                    expect(firstGroup.$.n).to.be.equal(nearestStop);

                    resolve(true);
                });
            }, done));
        });
    });

    it('should get route', function(done){
        const date = '15.03.2016'; // dd.mm.yyy
        const time = '03.00'; // hh.mm
        const url = `${baseUrl}/v1SearchXML?From=${dkPlassStopName}&to=${lagunenStopName}&instant=1&Date=${date}&Time=${time}`;

        return new Promise((resolve)=> {
            request({
                method: 'get',
                uri: url
            }, asyncCatch((error, response, body) => {
                if (error) throw { error: error };

                parseString(body, (err, result) => {
                    if (err) throw { error: err };

                    const trips = result.result.trips[0].trip;
                    const deps = trips.map((trip) => {
                        const { n, n2, nd, l, tn, td } = trip.i[0].$;
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
                    }).filter(d => d.first.kind != 'Gange');
                    //console.log(deps);

                    resolve(deps);
                });
            }, done));
        });
    });
});
