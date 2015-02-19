'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-stream'));

    var streamCTRL, scope, unStreamConnectionService;

    beforeEach(inject(function ($controller, $rootScope, unStreamConnection) {
        unStreamConnectionService = unStreamConnection;
        scope = $rootScope.$new();

        streamCTRL = function () {
            $controller('unStreamConnection', {
                $scope: scope,
                unStreamConnection: unStreamConnectionService
            });
        };
    }));

    describe('check methode', function () {
        beforeEach(function(){
            streamCTRL();
        });
        describe('callUser', function () {
            it('should call `unStreamConnection.call` with peerId,type,metaData ', function () {
                spyOn(unStreamConnectionService, 'call').and.returnValue(true);
                scope.callUser([{id:'peerId'}], 'type', {metaData: 'meta'});
                expect(unStreamConnectionService.call).toHaveBeenCalledWith('peerId', 'type', {metaData: 'meta'});
            });
        });

        describe('answer', function () {
            it('should call `unStreamConnection.answer` with peerId,type,metaData ', function () {
                spyOn(unStreamConnectionService, 'answer').and.returnValue(true);
                scope.answer('peerId', 'type');
                expect(unStreamConnectionService.answer).toHaveBeenCalledWith('peerId', 'type');
            });
        });

        describe('close', function () {
            it('should call `unStreamConnection.call` with peerId,type,metaData ', function () {
                spyOn(unStreamConnectionService, 'close').and.returnValue(true);
                scope.close('peerId');
                expect(unStreamConnectionService.close).toHaveBeenCalledWith('peerId');
            });
        });

        describe('getStreamsWaitingForYourAnswer' , function(){
            beforeEach(function(){
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set return value from `unStreamConnection.getList` to `scope.streamsWaitingForYourAnswer`' , function(){
                scope.getStreamsWaitingForYourAnswer();
                expect(scope.streamsWaitingForYourAnswer).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `waitingForYourAnswer`' , function(){
                scope.getStreamsWaitingForYourAnswer();
                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'waitingForYourAnswer'});
            });
            it('should call `unStreamConnection.getList` with filter status `waitingForYourAnswer` and channel' , function(){
                scope.getStreamsWaitingForYourAnswer('testChannel');
                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'waitingForYourAnswer',channel : 'testChannel'});
            });
        });

        describe('getOpenStreams' , function(){
            beforeEach(function(){
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set return value from `unStreamConnection.getList` to `scope.openStream`' , function(){
                scope.getOpenStreams();
                expect(scope.openStream).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `open`' , function(){
                scope.getOpenStreams();

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'open'});
            });
            it('should call `unStreamConnection.getList` with filter status `open` and channel' , function(){
                scope.getOpenStreams('testChannel');

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'open',channel : 'testChannel'});
            });
        });

        describe('getStreamsWaitingForClientAnswer' , function(){
            beforeEach(function(){
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set value from `unStreamConnection.getList` to `scope.openStream`' , function(){
                scope.getStreamsWaitingForClientAnswer();
                expect(scope.streamsWaitingForClientAnswer).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `waitingForClientAnswer`' , function(){
                scope.getStreamsWaitingForClientAnswer();

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'waitingForClientAnswer'});
            });
            it('should call `unStreamConnection.getList` with filter status `waitingForClientAnswer` and channel' , function(){
                scope.getStreamsWaitingForClientAnswer('testChannel');

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status : 'waitingForClientAnswer',channel : 'testChannel'});
            });
        });

        describe('getOwnStream' , function() {
            beforeEach(function(){
                spyOn(unStreamConnectionService, 'getOwnStream').and.returnValue('ownStream');
            });
            it('should set value from `unStreamConnection.getOwnStream` to `scope.getOwnStream`' , function(){
                scope.getOwnStream('test');
                expect(scope.ownStream).toEqual('ownStream');
            });

            it('should set value from `unStreamConnection.getOwnStream` to `scope.getOwnStream`' , function(){
                scope.getOwnStream('testType');

                expect(unStreamConnectionService.getOwnStream).toHaveBeenCalledWith('testType');
            });
        });

    });


});
