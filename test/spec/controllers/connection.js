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
        beforeEach(function () {
            streamCTRL();
        });
        describe('call', function () {
            beforeEach(inject(function ($q) {
                spyOn(unStreamConnectionService, 'createOwnStream').and.callFake(function () {
                    var defer = $q.defer();
                    defer.resolve();
                    return defer.promise;
                });
                spyOn(unStreamConnectionService, 'call').and.returnValue(true);
            }));
            it('should call `unStreamConnection.createOwnStream` with `type`', function () {
                scope.call('ownPeerId', 'streamType', {meta: 'data'});

                expect(unStreamConnectionService.createOwnStream).toHaveBeenCalledWith('streamType');
            });

            it('should call `unStreamConnection.call` with peerId,type,metaData ', function () {
                scope.call([{id: 'peerId'}], 'type', 'testChannel');
                scope.$apply();
                expect(unStreamConnectionService.call).toHaveBeenCalledWith('peerId', 'type',
                    {
                        users: [{id: 'peerId'}],
                        channel: 'testChannel'
                    });
            });
        });

        describe('answer', function () {
            beforeEach(inject(function ($q) {
                spyOn(unStreamConnectionService, 'createOwnStream').and.callFake(function () {
                    var defer = $q.defer();
                    defer.resolve();
                    return defer.promise;
                });
                spyOn(unStreamConnectionService, 'answer').and.returnValue(true);
                spyOn(scope, 'call').and.returnValue(true);
                spyOn(unStreamConnectionService, 'get').and.returnValue({
                    meta: {
                        users: [
                            {id: 'userA'}
                        ],
                        channel : 'testChannel'
                    }
                });
            }));

            it('should call `unStreamConnection.createOwnStream` with `type`', function () {
                scope.answer('peerId', 'streamType');

                expect(unStreamConnectionService.createOwnStream).toHaveBeenCalledWith('streamType');
            });


            it('should call `unStreamConnection.answer` with peerId,type,metaData ', function () {
                scope.answer('peerId', 'type');

                scope.$apply();

                expect(unStreamConnectionService.answer).toHaveBeenCalledWith('peerId', 'type');
            });

            it('should call `unStreamConnection.get` with peerId', function () {
                scope.answer('peerId', 'type');

                scope.$apply();

                expect(unStreamConnectionService.get).toHaveBeenCalledWith('peerId');
            });

            it('should call `scope.call` with meta.users', function () {
                scope.answer('peerId', 'streamType');

                scope.$apply();

                expect(scope.call).toHaveBeenCalledWith([{id: 'userA'}],'streamType','testChannel');
            });
        });

        describe('close', function () {
            it('should call `unStreamConnection.call` with peerId,type,metaData ', function () {
                spyOn(unStreamConnectionService, 'close').and.returnValue(true);
                scope.close('peerId');
                expect(unStreamConnectionService.close).toHaveBeenCalledWith('peerId');
            });
        });

        describe('getStreamsWaitingForYourAnswer', function () {
            beforeEach(function () {
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set return value from `unStreamConnection.getList` to `scope.streamsWaitingForYourAnswer`', function () {
                scope.getStreamsWaitingForYourAnswer();
                expect(scope.streamsWaitingForYourAnswer).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `waitingForYourAnswer`', function () {
                scope.getStreamsWaitingForYourAnswer();
                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status: 'waitingForYourAnswer'});
            });
            it('should call `unStreamConnection.getList` with filter status `waitingForYourAnswer` and channel', function () {
                scope.getStreamsWaitingForYourAnswer('testChannel');
                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({
                    status: 'waitingForYourAnswer',
                    channel: 'testChannel'
                });
            });
        });

        describe('getOpenStreams', function () {
            beforeEach(function () {
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set return value from `unStreamConnection.getList` to `scope.openStream`', function () {
                scope.getOpenStreams();
                expect(scope.openStream).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `open`', function () {
                scope.getOpenStreams();

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status: 'open'});
            });
            it('should call `unStreamConnection.getList` with filter status `open` and channel', function () {
                scope.getOpenStreams('testChannel');

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({
                    status: 'open',
                    channel: 'testChannel'
                });
            });
        });

        describe('getStreamsWaitingForClientAnswer', function () {
            beforeEach(function () {
                spyOn(unStreamConnectionService, 'getList').and.returnValue(['returnList']);
            });

            it('should set value from `unStreamConnection.getList` to `scope.openStream`', function () {
                scope.getStreamsWaitingForClientAnswer();
                expect(scope.streamsWaitingForClientAnswer).toEqual(['returnList']);
            });

            it('should call `unStreamConnection.getList` with filter status `waitingForClientAnswer`', function () {
                scope.getStreamsWaitingForClientAnswer();

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status: 'waitingForClientAnswer'});
            });
            it('should call `unStreamConnection.getList` with filter status `waitingForClientAnswer` and channel', function () {
                scope.getStreamsWaitingForClientAnswer('testChannel');

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({
                    status: 'waitingForClientAnswer',
                    channel: 'testChannel'
                });
            });
        });

        describe('getOwnStream', function () {
            beforeEach(function () {
                spyOn(unStreamConnectionService, 'getOwnStream').and.returnValue('ownStream');
            });
            it('should set value from `unStreamConnection.getOwnStream` to `scope.getOwnStream`', function () {
                scope.getOwnStream('test');
                expect(scope.ownStream).toEqual('ownStream');
            });

            it('should set value from `unStreamConnection.getOwnStream` to `scope.getOwnStream`', function () {
                scope.getOwnStream('testType');

                expect(unStreamConnectionService.getOwnStream).toHaveBeenCalledWith('testType');
            });
        });

    });


});
