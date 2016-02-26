'use strict';

var _chai = require('chai');

var _lodash = require('lodash');

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _proxyquire = require('proxyquire');

var _proxyquire2 = _interopRequireDefault(_proxyquire);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mockdate = require('mockdate');

var _mockdate2 = _interopRequireDefault(_mockdate);

var _utils = require('./utils.test');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testData = (0, _utils.readTestData)('1.txt');

describe('skyss tests', function () {

    var skyss = undefined,
        requestStub = undefined;
    before(function () {
        _mockdate2.default.set((0, _moment2.default)('12:30', 'hh:mm'));

        requestStub = _sinon2.default.stub(_request2.default, 'get');
        skyss = (0, _proxyquire2.default)('./../skyss', { 'request': requestStub });

        requestStub.callsArgWithAsync(1, false, { statusCode: 200 }, testData);
    });

    after(function () {
        _mockdate2.default.reset();
        requestStub.reset();
    });

    it('should find the next departure', function (done) {
        skyss.getNextDeparture({ from: 'whatever', to: 'whatever' }).then((0, _utils.asyncCatch)(function (data) {
            (0, _chai.expect)(data).to.include({ time: '12:51', when: 'om 21 minutter' });
        }, done)).catch(done);
    });

    it('should find all departures', function (done) {
        skyss.getDepartures({ from: 'whatever', to: 'whatever' }).then((0, _utils.asyncCatch)(function (data) {
            (0, _chai.expect)(data).be.a('array');
            (0, _chai.expect)(data.length).to.equal(10);
            (0, _chai.expect)((0, _lodash.first)(data)).to.include({ time: '12:51', when: 'om 21 minutter' });
            (0, _chai.expect)((0, _lodash.last)(data)).to.include({ time: '15:41', when: 'om 3 timer' });
        }, done)).catch(done);
    });
});
//# sourceMappingURL=skyss.test.js.map
