import { get } from 'request';
//import moment from 'moment';
import moment from 'moment-timezone';
import { first } from 'lodash';
import { parseData } from './parser';

moment.locale('nb');
const baseTravelMagicUrl = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll';

function getUrl({from1, to1, now = 1, buss = 1, expressbuss = 1, lang = 'en'}){
    return `${baseTravelMagicUrl}/svar?referrer=&lang=${lang}&dep1=&theme=&from=${from1}&to=${to1}&Time=&Date=&now=${now}&direction=1&search=S%C3%B8k&GetTR0=${buss}&GetTR1=${expressbuss}&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=`;
}

export function getNextDeparture(options){
    return new Promise((resolve, reject) => {
        getDepartures(options).then((data) => {
            resolve(first(data));
        }).catch((e) => {
            reject(e);
        });
    });
}

export function getDepartures({from, to}){
    return new Promise((resolve, reject) => {
        var url = getUrl({
            from1: encodeURIComponent(from),
            to1: encodeURIComponent(to)
        });

        get(url, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(parseData(body).map((time) => {
                    return {
                        time,
                        when: moment.tz(time, 'hh:mm', 'Europe/Oslo').fromNow()
                    };
                }));
            } else {
                reject({
                    message: 'the error',
                    error
                });
            }
        });
    });
}
