import http from 'http';

export const HOLDEPLASSER = {
    Danmarksplass: 'Danmarks plass (Bergen)',
    Lagunen: 'Lagunen (Bergen)',
    Dortlehaugen: 'Dortledhaugen (Bergen)'
};

export function getData(from, to){
    const url = 'http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll/' +
        'svar?referrer=&lang=en&dep1=&theme=' +
        `&from=${from}` +
        `&to=${to}` +
        '&Time=22%3A13&Date=22.02.2016' +
        '&now=1' +
        '&direction=1&search=Search&adv=1&GetTR0=1&GetTR1=1&GetTR5=1&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=';

    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            let data = '';
            res.on('data', (chunk)=>{
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }, reject);
    });
}




/*
http://reiseplanlegger.skyss.no/scripts/travelmagic/TravelMagicWE.dll/svar?lang=en&from=Dortledhaugen+%28Bergen%29&to=Lagunen+%28Bergen%29&now=1&direction=1&search=Search&adv=1&GetTR0=1&GetTR1=1&GetTR5=1&through=&throughpause=&changepenalty=1&changepause=0&linjer=&destinations=
*/
