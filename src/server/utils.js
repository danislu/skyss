import { get } from 'request';
import { parseString } from 'xml2js';

export const HOLDEPLASSER = {
    Danmarksplass: 'Danmarks plass (Bergen)',
    Lagunen: 'Lagunen (Bergen)',
    Dortledhaugen: 'Dortledhaugen (Bergen)'
};

export const baseTravelMagicUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';

export function getXmlToJson(url, fn){
    return new Promise((resolve, reject) => {
        get(url, (error, response, body) => {
            if (error) {
                reject(error);
                return;
            }

            parseString(body, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    fn(result, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
}
