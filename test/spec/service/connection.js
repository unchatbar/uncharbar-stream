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
                    {
                        peerId: 'peerId',
                        connection: {
                            answer: function () {
                            }
                        }
                    }
                ];
                spyOn(unStreamConnectionService.streams[1].connection, 'answer').and.returnValue(true);
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
        describe('close', function () {
            beforeEach(inject(function ($q) {
                unStreamConnectionService.streams = [
                    {peerId: 'otherClient'},
                    {
                        peerId: 'peerId',
                        connection: {
                            close: function () {
                            }
                        }
                    }
                ];
                spyOn(unStreamConnectionService.streams[1].connection, 'close').and.returnValue(true);
            }));
            it('should remove peer from unStreamConnection.streams', function () {
                unStreamConnectionService.close('peerId');

                expect(unStreamConnectionService.streams[1].connection.close).toHaveBeenCalled();
            });
        });
        describe('add', function () {
            var connectionMock, callBackMock = {};

            beforeEach(function () {
                connectionMock = {
                    peer: 'clientPeerId',
                    metaData: {
                        channel: 'streamChannel'
                    },
                    on: function () {

                    }
                };
                spyOn(connectionMock, 'on').and.callFake(function (eventName, callback) {
                    connectionMock[eventName] = callback;
                });
            });
            it('should push connection to unStreamConnection.streams', function () {
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');

                expect(unStreamConnectionService.streams).toEqual([
                    {
                        peerId: 'clientPeerId',
                        channel: 'streamChannel',
                        status: 'waitingForClientAnswer',
                        connection: connectionMock

                    }
                ]);
            });

            it('should change status to `open` after event `stream` triggerd ', function () {
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');
                connectionMock.stream();

                expect(unStreamConnectionService.streams[0].status).toBe('open');

            });
            it('should change status to `open` after event `stream` triggerd ', function () {
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');

                connectionMock.close();

                expect(unStreamConnectionService.streams).toEqual([]);
            });
        });
        describe('getList', function () {
            it('should return a filter list by status', function () {
                unStreamConnectionService.streams = [
                    {id: '1', status: 'test'},
                    {id: '2', status: 'test'},
                    {id: '3', status: 'otherStatus'}
                ];
                expect(unStreamConnectionService.getList({status: 'test'})).toEqual([
                    {id: '1', status: 'test'},
                    {id: '2', status: 'test'}
                ]);
            });

            it('should return a filter list by status and channel', function () {
                unStreamConnectionService.streams = [
                    {id: '1', status: 'test', channel: 'A'},
                    {id: '2', status: 'test', channel: 'B'},
                    {id: '3', status: 'otherStatus', channel: 'A'},
                    {id: '4', status: 'test', channel: 'A'},
                ];
                expect(unStreamConnectionService.getList({status: 'test', channel: 'A'})).toEqual([
                    {id: '1', status: 'test', channel: 'A'},
                    {id: '4', status: 'test', channel: 'A'}
                ]);
            });
        });

        describe('createOwnStream', function () {
            describe('userMedia api is not available', function () {
                beforeEach(function () {
                    spyOn(unStreamConnectionService, '_getUserMediaApi').and.returnValue(0);
                });
                it('should reject an error', function () {
                    unStreamConnectionService._createOwnStream().then(function () {
                    }).catch(function (error) {
                        expect(error).toBe('no media api');
                    });
                    rootScope.$apply();
                });
            });

            describe('use stream from cache', function () {
                it('should return cache stream', function () {
                    var streamFromCache = '';
                    spyOn(unStreamConnectionService, 'getOwnStream').and.returnValue('cacheStream');
                    spyOn(unStreamConnectionService, '_getUserMediaApi').and.returnValue(true);
                    unStreamConnectionService._createOwnStream('video').then(function (stream) {
                        streamFromCache = stream;
                    });
                    rootScope.$apply();
                    expect(streamFromCache).toBe('cacheStream');
                });
            });

            describe('userMedia api is available', function () {
                var userMediaSuccess, userMediaError,
                    fakeUserMedia = {
                        api: function (option, onSuccess, onError) {
                            userMediaSuccess = onSuccess;
                            userMediaError = onError;
                        }
                    };
                beforeEach(function () {
                    spyOn(unStreamConnectionService, 'getOwnStream').and.returnValue(null);
                    spyOn(fakeUserMedia, 'api').and.callThrough();
                    spyOn(unStreamConnectionService, '_getUserMediaApi').and.returnValue(fakeUserMedia.api);
                });
                it('should call api with audi and video', function () {
                    unStreamConnectionService._createOwnStream('video');
                    rootScope.$apply();
                    expect(fakeUserMedia.api).toHaveBeenCalledWith(
                        {video : true,audio : true},
                        jasmine.any(Function),
                        jasmine.any(Function)
                    );
                });

                it('should call api with audi', function () {
                    unStreamConnectionService._createOwnStream('audio');
                    rootScope.$apply();
                    expect(fakeUserMedia.api).toHaveBeenCalledWith(
                        {video : false,audio : true},
                        jasmine.any(Function),
                        jasmine.any(Function)
                    );
                });

                describe('userMedia return error', function () {
                    it('should reject error', function () {
                        var error = '';
                        unStreamConnectionService._createOwnStream()
                            .then(function () {
                            })
                            .catch(function (err) {
                                error = err;
                            });
                        userMediaError('MediaError');
                        rootScope.$apply();
                        expect(error).toBe('MediaError');
                    });
                });

                describe('userMedia was successfull', function () {
                    var streamReturn = {};
                    beforeEach(function () {
                        unStreamConnectionService._createOwnStream('video').then(function (stream) {
                            streamReturn = stream;
                        });
                    });
                    it('should store video stzream to `Stream.ownStream`', function () {
                        userMediaSuccess('stream');
                        expect(unStreamConnectionService.ownStream).toEqual({video: 'stream'});
                    });
                    it('should return stream', function () {
                        userMediaSuccess('stream');
                        rootScope.$apply();
                        expect(streamReturn).toBe('stream');
                    });
                });
            });
        });

        describe('getOwnStream' , function(){
            it('shout return null, when type isn\'t defined' , function(){
                expect(unStreamConnectionService.getOwnStream('text')).toBe(null);
            });

            it('shout return defined data from `api.ownStream[type]`' , function(){
                unStreamConnectionService.ownStream = {
                    'test' : 'data'
                };
                expect(unStreamConnectionService.getOwnStream('test')).toBe('data');
            });
        });

    });
});