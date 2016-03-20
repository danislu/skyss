var ajax = require('ajax');

function getTheDate(destination, callback){

    function onError(error){
        callback(error, null);
    }

    //b4dd20cd-cb21-4096-8c30-f15967b05e2c.node.dockerapp.io

    function onSuccess(position) {
        var latitude = position.coords.latitude; // 60.3006106;
        var longitude = position.coords.longitude; //5.3049681999999;

        var url = 'http://37.139.25.119/departures2?from_x=' + encodeURIComponent(longitude) + '&from_y=' + encodeURIComponent(latitude) + '&to=' + encodeURIComponent(destination);
        //console.log(url);

        ajax({ url: url, type: 'json' }, function(data) {
            callback(null, data);
        }, onError);
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

module.exports = {
    update: getTheDate
};
