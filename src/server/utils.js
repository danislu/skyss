import request from 'request';
import { parseString } from 'xml2js';

export const HOLDEPLASSER = {
    Danmarksplass: 'Danmarks plass (Bergen)',
    Lagunen: 'Lagunen (Bergen)',
    Dortledhaugen: 'Dortledhaugen (Bergen)'
};

export const baseTravelMagicUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';


export function getXmlToJson(url, fn){
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

                fn(result, resolve, reject);
            });
        });
    });
}
