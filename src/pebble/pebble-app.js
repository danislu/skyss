var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var currentIndex = 0,
    bussData = [],
    fra = 'Dortledhaugen',
    til = 'Lagunen';

var wind = new UI.Window({
  fullscreen: true,
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
  font: 'gothic-24-bold',
  text: '%x %X',
  textAlign: 'center',
  backgroundColor : 'clear'
});
wind.add(timetext);

var busstext1 = new UI.Text({
  position: new Vector2(0, 70),
  size: new Vector2(144, 40),
  textAlign: 'center',
  font: 'gothic-18-bold',
  text: 'Det går en buss fra ' + fra + ' til ' + til
});

var busstext2 = new UI.Text({
  position: new Vector2(0, 130),
  size: new Vector2(144, 40),
  textAlign: 'center',
  font: 'gothic-24-bold',
  text: 'dummy1'
});

wind.add(busstext1);
wind.add(busstext2);
wind.show();


var updateCurrent = function(){
  counter.text((currentIndex+1) + ' ' + bussData.length);
  busstext2.text('kl. ' + bussData[currentIndex].time);
};

var refreshData = function(){
  busstext2.text('refreshing');

  ajax(
    {
      url: 'http://82.196.7.135:8181/departures?from=' + fra + '&to=' + til,
      type: 'json'
    },
    function(data, status, request) {
      bussData = data || [];
      currentIndex = 0;
      updateCurrent();
    },
    function(error, status, request) {
      busstext1.text('The ajax request failed');
      busstext2.text(JSON.stringify(error));

      currentIndex = 0;
      updateCurrent();
    }
  );
};

wind.on('click', 'select', function() {
  refreshData();
});

wind.on('click', 'back', function(){
  wind.hide();
});

wind.on('click', 'up', function(){
  if (currentIndex <= 0)
    return;

  currentIndex -= 1;
  updateCurrent();
});

wind.on('click', 'down', function(){
  if (currentIndex >= bussData.length-1)
    return;

  currentIndex += 1;
  updateCurrent();
});

refreshData();
