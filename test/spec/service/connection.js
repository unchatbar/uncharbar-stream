'use strict';

describe('Serivce: phoneBook', function () {
    var rootScope, unStreamConnectionService, BrokerService;
    beforeEach(module('unchatbar-stream'));


    beforeEach(inject(function ($rootScope, unStreamConnection, Broker) {
        rootScope = $rootScope;
        unStreamConnectionService = unStreamConnection;
        BrokerService = Broker;
    }));

    describe('check methode', function () {
        describe('call', function () {
            beforeEach(inject(function ($q) {
                spyOn(unStreamConnectionService, '_createOwnStream').and.callFake(function () {
                    var defer = $q.defer();
                    defer.resolve('ownStream');
                    return defer.promise;
                });
                spyOn(BrokerService, 'connectStream').and.returnValue('streamConnection');
                spyOn(unStreamConnectionService, 'add').and.returnValue(true);
            }));
            it('should call `unStreamConnection._createOwnStream` with `type`', function () {
                unStreamConnectionService.call('peerId', 'streamType', {meta: 'data'});

                expect(unStreamConnectionService._createOwnStream).toHaveBeenCalledWith('streamType');
            });

            it('should call `Broker.connectStream` with `peerId`, `ownStream` and `metaData`', function () {
                unStreamConnectionService.call('peerId', 'streamType', {meta: 'data'});

                rootScope.$apply();

                expect(BrokerService.connectStream).toHaveBeenCalledWith('peerId', 'ownStream', {meta: 'data'});
            });

            it('should call `unStreamConnection.add` with `connection` and `waitingForClientAnswer`', function () {
                unStreamConnectionService.call('peerId', 'streamType', {meta: 'data'});

                rootScope.$apply();

                expect(unStreamConnectionService.add).toHaveBeenCalledWith('streamConnection', 'waitingForClientAnswer');
            });
        });
        describe('answer', function () {
            beforeEach(inject(function ($q) {
                spyOn(unStreamConnectionService, '_createOwnStream').and.callFake(function () {
                    var defer = $q.defer();
                    defer.resolve('ownStream');
                    return defer.promise;
                });
                unStreamConnectionService.streams = [
                    {peerId: 'otherClient'},
                    {peerId: 'peerId',connection : {answer : function(){}}}
                ];
                spyOn(unStreamConnectionService.streams[1].connection,'answer').and.returnValue(true);
            }));
            it('should call `unStreamConnection._createOwnStream` with `type`', function () {
                unStreamConnectionService.answer('peerId', 'streamType');

                expect(unStreamConnectionService._createOwnStream).toHaveBeenCalledWith('streamType');
            });

            it('should call `unStreamConnection._createOwnStream` with `type`', function () {
                unStreamConnectionService.answer('peerId', 'streamType');

                rootScope.$apply();

                expect(unStreamConnectionService.streams[1].connection.answer).toHaveBeenCalledWith('ownStream');
            });
        });
    });
});