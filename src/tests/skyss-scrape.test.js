import { expect } from 'chai';
import { first, last } from 'lodash';
import request from 'request';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import moment from 'moment';
import mockdate from 'mockdate';
import { asyncCatch, readTestData } from './utils.test';

const testData = readTestData('1.txt');

describe('skyss-scrape tests', function() {

    let sandbox;
    let skyss, requestStub;
    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        mockdate.set(moment('12:30', 'hh:mm'));

        requestStub = sandbox.stub(request, 'get');
        skyss = proxyquire('./../server/skyss-scrape', { 'request': requestStub });

        requestStub.callsArgWithAsync(1, false, {statusCode: 200}, testData);
    });

    afterEach(function(){
        mockdate.reset();

        sandbox.restore();
    });

    it('should find the next departure', function (done) {
        skyss.getNextDeparture({ from : 'whatever', to: 'whatever' })
            .then(asyncCatch((data) => {
                expect(data).to.include({ time: '12:51', when: 'om 21 minutter' });
            }, done))
            .catch(done);
    });

    it('should find all departures', function(done){
        skyss.getDepartures({ from: 'whatever', to: 'whatever' })
            .then(asyncCatch((data) => {
                expect(data).be.a('array');
                expect(data.length).to.equal(10);
                expect(first(data)).to.include({ time: '12:51', when: 'om 21 minutter'});
                expect(last(data)).to.include({ time: '15:41', when: 'om 3 timer'});
            }, done))
            .catch(done);
    });
});
