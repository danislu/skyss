'use strict';

var _proxyquire = require('proxyquire');

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mockdate = require('mockdate');

var _mockdate2 = _interopRequireDefault(_mockdate);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _chai = require('chai');

var _utils = require('./utils.test');

var _skyss = require('./../server/skyss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { first, last } from 'lodash';


var latLng = {
    y: 60.3006106,
    x: 5.304968199999999
};

var dkPlassStopName = 'Danmarks plass (Bergen)';

describe('asdf', function () {

    var sandbox = undefined,
        requestStub = undefined;
    before(function () {
        _mockdate2.default.set((0, _moment2.default)('12:30', 'hh:mm'));
    });

    after(function () {
        _mockdate2.default.reset();
    });

    beforeEach(function () {
        sandbox = _sinon2.default.sandbox.create();

        requestStub = sandbox.stub(_request2.default, 'get');
        (0, _proxyquire2.default)('./../server/skyss', { 'request': requestStub });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('api test 1', function (done) {
        requestStub.onFirstCall().callsArgWithAsync(1, false, { statusCode: 200 }, (0, _utils.readTestData)('nearestStops.xml'));
        requestStub.onSecondCall().callsArgWithAsync(1, false, { statusCode: 200 }, (0, _utils.readTestData)('search.xml'));

        return (0, _skyss.getNextDeparturesFromGeoToLocation)(latLng, dkPlassStopName).then((0, _utils.asyncCatch)(function (value) {
            //console.log(value[0]);
            (0, _chai.expect)(value.length).to.be.equal(10);
        }, done)).catch(done);
    });

    it('test suggestions', function (done) {
        requestStub.onFirstCall().callsArgWithAsync(1, false, { statusCode: 200 }, (0, _utils.readTestData)('location.xml'));

        return (0, _skyss.getSuggestions)('Danmarks').then((0, _utils.asyncCatch)(function (value) {
            (0, _chai.expect)(value.length).to.be.equal(4);
        }, done)).catch(done);
    });

    it('test it', function (done) {
        requestStub.onFirstCall().callsArgWithAsync(1, false, { statusCode: 200 }, '<?xml version="1.0" encoding="UTF-8" ?><stages/>');
        return (0, _skyss.getNextDeparturesFromGeoToLocation)({
            x: 39.0437,
            y: -77.4875
        }, 'Lagunen').then((0, _utils.asyncCatch)(function () {
            throw { error: 'wtf' };
        }, done)).catch((0, _utils.asyncCatch)(function (v) {
            (0, _chai.expect)(v).to.include({ error: 'No stops found' });
        }, done));
    });
});