'use strict';

var ajax = require('ajax');

function getTheDate(destination, callback) {

    function onError(error) {
        console.log('ERROR: ' + JSON.stringify(error));
        callback(error, null);
    }

    //b4dd20cd-cb21-4096-8c30-f15967b05e2c.node.dockerapp.io

    function onSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var url = 'http://37.139.17.6/departures2?from_x=' + encodeURIComponent(longitude) + '&from_y=' + encodeURIComponent(latitude) + '&to=' + encodeURIComponent(destination);
        console.log(url);

        ajax({ url: url, type: 'json' }, function (data) {
            callback(null, data);
        }, onError);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

module.exports = {
    update: getTheDate
};
//# sourceMappingURL=skysser.js.map
