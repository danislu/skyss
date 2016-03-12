import { baseTravelMagicUrl, getXmlToJson } from './utils';

function getNearestStop(from){
    const {x,y} = from;
    const maxdist = 250;
    const url = `${baseTravelMagicUrl}/v1NearestStopsXML?y=${y}&x=${x}&maxdist=${maxdist}`;

    return getXmlToJson(url, (result, resolve) => {

        let value = '';
        if (result.stages && result.stages.group && result.stages.group.length > 0){
            value = result.stages.group[0].$.n;
        }

        resolve(value);
    });
}

export function getNextDeparturesFromGeoToLocation(fromCoords, to){
    return getNearestStop(fromCoords).then((value) => {
        const url = `${baseTravelMagicUrl}/v1SearchXML?From=${value}&to=${to}&instant=1`;

        return getXmlToJson(url, (result, resolve) => {
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
}


export function getSuggestions(filter){
    const url = `${baseTravelMagicUrl}/v2LocationXML?filter=${filter}&type=1`;

    return getXmlToJson(url, (result, resolve) => {
        resolve(result.stages.i.map((i)=> i.$.n));
    });

    //http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll//v2LocationXML?filter=Danmarks plass&type=1
}
