import { expect } from 'chai';
import { first, last } from 'lodash';
import request from 'request';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import moment from 'moment';
import mockdate from 'mockdate';
import { asyncCatch, readTestData } from './utils.test';

const testData = readTestData('1.txt');

describe('skyss tests', function() {

    let skyss, requestStub;
    before(function(){
        mockdate.set(moment('12:30', 'hh:mm'));

        requestStub = sinon.stub(request, 'get');
        skyss = proxyquire('./../skyss', { 'request': requestStub });

        requestStub.callsArgWithAsync(1, false, {statusCode: 200}, testData);
    });

    after(function(){
        mockdate.reset();
        requestStub.reset();
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
