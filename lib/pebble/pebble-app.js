'use strict';

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var skysser = require('skysser');

Settings.config({
    url: 'http://www.example.com'
}, function (e) {
    console.log(e);
});
/*
Settings.option({
    ui: {
        backgroundColor: 'black',
        textColor: 'white'
    },
    destinations: [
        {
  name: '',
  lat: 0,
  lng: 0
        },
        {
          name: '',
          lat: 0,
          lng: 0
        }
    ]
    });
*/
var currentIndex = 0,
    bussData = [],

//fra = 'Dortledhaugen',
til = 'Danmarks plass (Bergen)';
//    til = 'Lagunen';

var wind = new UI.Window({
    fullscreen: true
});

var counter = new UI.Text({
    position: new Vector2(124, 5),
    size: new Vector2(20, 30),
    font: 'gothic-10',
    text: 'x x'
});

wind.add(counter);

var timetext = new UI.TimeText({
    position: new Vector2(0, 10),
    size: new Vector2(144, 50),
    font: 'gothic-18-bold',
    text: '%X',
    textAlign: 'center',
    backgroundColor: 'clear'
});
wind.add(timetext);

var busstext1 = new UI.Text({
    position: new Vector2(0, 70),
    size: new Vector2(144, 40),
    textAlign: 'center',
    font: 'gothic-18-bold',
    text: 'Refreshing...'
});

var busstext2 = new UI.Text({
    position: new Vector2(0, 130),
    size: new Vector2(144, 40),
    textAlign: 'center',
    font: 'gothic-18-bold',
    text: 'dummy1'
});

wind.add(busstext1);
wind.add(busstext2);
wind.show();

/*
{
  trip:
       {
         duration: '35',
         start: '13.03.2016 23:14:00',
         stop: '13.03.2016 23:49:00',
         changecount: '1'
        },
      first:
       { from: 'Dortledhaugen (Bergen)',
         to: 'Lagunen terminal I (Bergen)',
         line_name: 'Lagunen terminal',
         line_no: '22',
         kind: 'Buss',
         travel_time: '6' } }
  */

var updateCurrent = function updateCurrent() {
    counter.text(currentIndex + 1 + ' ' + bussData.length);

    var tur = bussData[currentIndex];
    busstext1.text(tur.first.line_no + ' (' + tur.first.travel_time + '/' + tur.trip.duration + 'min): ' + tur.first.from + ' - ' + tur.first.to);
    busstext2.text(tur.trip.start);
};

var refreshData = function refreshData() {
    busstext2.text('refreshing');

    skysser.update(til, function (error, data) {
        if (error) {
            busstext1.text('Error:');
            busstext2.text(error.error);
            return;
        }

        bussData = data || [];

        currentIndex = 0;
        updateCurrent();
    });
};

wind.on('click', 'select', function () {
    refreshData();
});

wind.on('click', 'back', function () {
    wind.hide();
});

wind.on('click', 'up', function () {
    if (currentIndex <= 0) return;

    currentIndex -= 1;
    updateCurrent();
});

wind.on('click', 'down', function () {
    if (currentIndex >= bussData.length - 1) return;

    currentIndex += 1;
    updateCurrent();
});

refreshData();
//# sourceMappingURL=pebble-app.js.map
