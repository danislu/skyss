'use strict';

var ajax = require('ajax'),
    baseUrl = 'http://127.0.0.1';

function getTheDate(destination, callback) {

    function onError(error) {
        console.log('ERROR: ' + JSON.stringify(error));
        callback(error, null);
    }

    function onSuccess(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var url = baseUrl + '/departures2?from_x=' + encodeURIComponent(longitude) + '&from_y=' + encodeURIComponent(latitude) + '&to=' + encodeURIComponent(destination);
        console.log(url);

        ajax({ url: url, type: 'json' }, function (data) {
            callback(null, data);
        }, onError);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

module.exports = {
    setApiRoot: function setApiRoot(url) {
        baseUrl = url;
    },
    update: getTheDate
};
//# sourceMappingURL=skysser.js.map
