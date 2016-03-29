var UI = require('ui');
var Vector2 = require('vector2');

var init = function(options){
    var currentIndex = 0,
        bussData = options.data;

    console.log('DATA: ' + JSON.stringify(bussData));

    var wind = new UI.Window({
        fullscreen: true
    });

    var counter = new UI.Text({
        position: new Vector2(124, 5),
        size: new Vector2(20, 30),
        font: 'gothic-10',
        text: 'x x'
    });

    var timetext = new UI.TimeText({
        position: new Vector2(0, 10),
        size: new Vector2(144, 50),
        font: 'gothic-18-bold',
        text: '%X',
        textAlign: 'center',
        backgroundColor : 'clear'
    });

    var busstext1 = new UI.Text({
        position: new Vector2(0, 70),
        size: new Vector2(144, 40),
        textAlign: 'center',
        font: 'gothic-18-bold',
        text: 'This is not the trip you are looking for...'
    });

    var busstext2 = new UI.Text({
        position: new Vector2(0, 130),
        size: new Vector2(144, 40),
        textAlign: 'center',
        font: 'gothic-18-bold',
        text: '...'
    });

    wind.add(counter);
    wind.add(timetext);
    wind.add(busstext1);
    wind.add(busstext2);


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

    var updateCurrent = function(){
        counter.text((currentIndex+1) + ' ' + bussData.length);

        var tur = bussData[currentIndex];
        if (!tur)
            return;

        busstext1.text(tur.first.line_no + ' (' + tur.first.travel_time + '/' +  tur.trip.duration + 'min): ' + tur.first.from + ' - ' + tur.first.to );
        busstext2.text(tur.trip.start);
    };

    wind.on('click', 'select', function() {
        //refreshData();
    });

    wind.on('click', 'back', function(){
        wind.hide();

        if (options.onCancel){
            options.onCancel();
        }
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
    updateCurrent();

    wind.show();
};


module.exports = {
    show: init
};
