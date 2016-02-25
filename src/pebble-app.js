var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');
var Wakeup = require('wakeup');

var wind = new UI.Window({
  fullscreen: true,
});

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
  position: new Vector2(0, 80),
  size: new Vector2(144, 30),
  textAlign: 'center',
  font: 'gothic-18-bold',
  text: 'dummy1'
});

var busstext2 = new UI.Text({
  position: new Vector2(0, 110),
  size: new Vector2(144, 40),
  textAlign: 'center',
  text: 'dummy1'
});

wind.add(busstext1);
wind.add(busstext2);
wind.show();

var update = function(){
  busstext1.text('refreshing');
  busstext2.text('...');

  ajax(
    {
      url: 'http://82.196.7.135:8181/next?from=Dortledhaugen&to=Lagunen',
      type: 'json'
    },
    function(data, status, request) {
      busstext1.text('neste buss kl. ' + data.time);
      busstext2.text(data.when);
    },
    function(error, status, request) {
      busstext1.text('The ajax request failed');
      busstext2.text(JSON.stringify(error));
    }
  );
};

wind.on('click', 'back', function() {
  update();
});

update();
