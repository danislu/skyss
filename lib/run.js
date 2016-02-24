'use strict';

var _index = require('./index');

/*
getDepartures({from: HOLDEPLASSER.Dortlehaugen, to: HOLDEPLASSER.Lagunen}).then((data) => {
    console.log(data);
});
*/

function doIt() {
    (0, _index.getDepartures)({ from: _index.HOLDEPLASSER.Danmarksplass, to: _index.HOLDEPLASSER.Lagunen }).then(function (data) {
        console.log(data);
    });
}

doIt();
//# sourceMappingURL=run.js.map
