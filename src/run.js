

import { getDepartures, getNextDeparture, HOLDEPLASSER } from './index';

/*
getDepartures({from: HOLDEPLASSER.Dortlehaugen, to: HOLDEPLASSER.Lagunen}).then((data) => {
    console.log(data);
});
*/

function doIt(){
    getDepartures({from: HOLDEPLASSER.Danmarksplass, to: HOLDEPLASSER.Lagunen}).then((data)=>{
        console.log(data);
    });
}

doIt();
