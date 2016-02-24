'use strict';

var _index = require('./index');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = 8181;

var log = function log(msg) {
    console.log(new Date() + ': ' + msg);
};

var doQuery = function doQuery(req, res, fn) {
    var from = req.query.from;
    var to = req.query.to;

    log('req: ' + from + ' -> ' + to);

    if (!_index.HOLDEPLASSER.hasOwnProperty(from)) {
        var msg = 'res: 404 destination ' + from + ' not not found';
        log(msg);
        res.status(404).end(msg);
        return;
    }
    if (!_index.HOLDEPLASSER.hasOwnProperty(to)) {
        var msg = 'res: 404 destination ' + to + ' not found';
        log(msg);
        res.status(404).end(msg);
        return;
    }

    fn({ from: _index.HOLDEPLASSER[from], to: _index.HOLDEPLASSER[to] }).then(function (data) {
        log('res: 200 ' + JSON.stringify(data));
        res.json(data);
    }).catch(function (e) {
        log('res: 500 ' + JSON.stringify(e));
        res.status(500).json(e);
    });
};

app.get('/', function (req, res) {
    log('service document fetched');
    res.json({
        next: { endpoint: '/next?from=<destination>&to=<destination>', description: 'get when the next departure from and to the given quey parameters will depart.' },
        departures: { endpoint: '/departures?from=<destination>&to=<destination>', description: 'get when the next 10 (or so) departures from and to the given quey parameters will depart.' },
        destinations: { endpoint: '/departures', description: 'the valid destinations' }
    });
});

app.get('/next', function (req, res) {
    doQuery(req, res, _index.getNextDeparture);
});

app.get('/departures', function (req, res) {
    doQuery(req, res, _index.getDepartures);
});

app.get('/destinations', function (req, res) {
    log('destinations fetched');
    res.json(Object.keys(_index.HOLDEPLASSER));
});

app.listen(port);
console.log('listening to port ' + port);
//# sourceMappingURL=run.js.map
