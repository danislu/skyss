import { getDepartures, getNextDeparture, HOLDEPLASSER } from './index';
import express from 'express';
var app = express();

const port = 8181;

const log = (msg) => {
    console.log(`${new Date()}: ${msg}`);
};

const doQuery = (req, res, fn) =>{
    const from = req.query.from;
    const to = req.query.to;

    log(`req: ${from} -> ${to}`);

    if (!HOLDEPLASSER.hasOwnProperty(from)){
        const msg = `res: 404 destination ${from} not not found`;
        log(msg);
        res.status(404).end(msg);
        return;
    }
    if (!HOLDEPLASSER.hasOwnProperty(to)){
        const msg = `res: 404 destination ${to} not found`;
        log(msg);
        res.status(404).end(msg);
        return;
    }

    fn({from: HOLDEPLASSER[from], to: HOLDEPLASSER[to]}).then((data) => {
        log(`res: 200 ${JSON.stringify(data)}`);
        res.json(data);
    }).catch((e) => {
        log(`res: 500 ${JSON.stringify(e)}`);
        res.status(500).json(e);
    });
};

app.get('/', (req, res) => {
    log('service document fetched');
    res.json({
        next: { endpoint: '/next?from=<destination>&to=<destination>', description: 'get when the next departure from and to the given quey parameters will depart.'},
        departures: { endpoint: '/departures?from=<destination>&to=<destination>', description: 'get when the next 10 (or so) departures from and to the given quey parameters will depart.'},
        destinations: { endpoint: '/departures', description: 'the valid destinations'}
    });
});

app.get('/next', (req, res) => {
    doQuery(req, res, getNextDeparture);
});

app.get('/departures', (req, res) => {
    doQuery(req, res, getDepartures);
});

app.get('/destinations', (req, res) => {
    log('destinations fetched');
    res.json(Object.keys(HOLDEPLASSER));
});

app.listen(port);
console.log(`listening to port ${port}`);
