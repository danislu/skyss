import request from 'request';
import { parseString } from 'xml2js';
import { baseTravelMagicUrl } from './utils';

function getNearestStop(from){
    const {lat, lng} = from;
    const maxdist = 250;
    const url = `${baseTravelMagicUrl}/v1NearestStopsXML?y=${lat}&x=${lng}&maxdist=${maxdist}`;

    return new Promise((resolve, reject)=>{
        request({
            method: 'get',
            uri: url
        }, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }

            parseString(body, (err, result)=> {
                if (err) {
                    reject(err);
                    return;
                }

                let value = '';
                if (result.stages && result.stages.group && result.stages.group.length > 0){
                    value = result.stages.group[0].$.n;
                }

                resolve(value);
            });
        });
    });
}

export function getNextDeparturesFromGeoToLocation(from, to){

    return getNearestStop(from).then((value) => {
        return new Promise((resolve, reject)=>{
            const url = `${baseTravelMagicUrl}/v1SearchXML?From=${value}&to=${to}&instant=1`;

            request({
                method: 'get',
                uri: url
            }, (error, response, body) => {
                if (error) {
                    reject(error);
                    return;
                }

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
