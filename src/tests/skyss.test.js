
//import { first, last } from 'lodash';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import moment from 'moment';
import mockdate from 'mockdate';

import request from 'request';
import { expect } from 'chai';
import { asyncCatch, readTestData } from './utils.test';
import { getNextDeparturesFromGeoToLocation, getSuggestions } from './../server/skyss';

const latLng = {
    y: 60.3006106,
    x: 5.304968199999999
};

const dkPlassStopName = 'Danmarks plass (Bergen)';

describe('asdf', function(){

    let sandbox, requestStub;
    before(function(){
        mockdate.set(moment('12:30', 'hh:mm'));
    });

    after(function(){
        mockdate.reset();
    });

    beforeEach(function(){
        sandbox = sinon.sandbox.create();

        requestStub = sandbox.stub(request, 'get');
        proxyquire('./../server/skyss', { 'request': requestStub });
    });

    afterEach(function(){
        sandbox.restore();
    });


    it('api test 1', function(done){
        requestStub.onFirstCall().callsArgWithAsync(1, false, {statusCode: 200}, readTestData('nearestStops.xml'));
        requestStub.onSecondCall().callsArgWithAsync(1, false, {statusCode: 200}, readTestData('search.xml'));

        return getNextDeparturesFromGeoToLocation(latLng, dkPlassStopName)
            .then(asyncCatch((value)=>{
                expect(value.length).to.be.equal(10);
            }, done))
            .catch(done);
    });

    it('test suggestions', function(done){
        requestStub.onFirstCall().callsArgWithAsync(1, false, {statusCode: 200}, readTestData('location.xml'));

        return getSuggestions('Danmarks')
            .then(asyncCatch((value)=>{
                expect(value.length).to.be.equal(4);
            }, done))
            .catch(done);
    });

    it('test it', function(done){
        requestStub.onFirstCall().callsArgWithAsync(1, false, {statusCode: 200}, '<?xml version="1.0" encoding="UTF-8" ?><stages/>' );
        return getNextDeparturesFromGeoToLocation({
            x: 39.0437,
            y: -77.4875
        }, 'Lagunen')
            .then(asyncCatch((v)=>{
                throw { error: 'wtf' };
            }, done))
            .catch(asyncCatch((v)=>{
                expect(v).to.include({ error: 'No stops found' });
            },done));
    });
});
