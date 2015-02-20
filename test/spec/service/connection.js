'use strict';

describe('Serivce: phoneBook', function () {
    var rootScope,windowService,sceService, unStreamConnectionService, BrokerService;
    beforeEach(module('unchatbar-stream'));


    beforeEach(inject(function ($rootScope,$window,$sce, unStreamConnection, Broker) {
        rootScope = $rootScope;
        unStreamConnectionService = unStreamConnection;
        BrokerService = Broker;
        windowService = $window;
        sceService = $sce;
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
            describe('call peerId is own peer id', function () {
                beforeEach(function () {
                    spyOn(BrokerService, 'getPeerId').and.returnValue('ownPeerId');
                });
                it('should call `unStreamConnection._createOwnStream` with `type`', function () {
                    unStreamConnectionService.call('ownPeerId', 'streamType', {meta: 'data'});

                    expect(unStreamConnectionService._createOwnStream).not.toHaveBeenCalledWith('streamType');
                });

            });
            describe('call peerId is not own peer id', function () {
                beforeEach(function () {
                    spyOn(BrokerService, 'getPeerId').and.returnValue('ownPeerId');
                });
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

                it('should not call `Broker.connectStream` when `peerId`exists in unStreamConnection.streams', function () {
                    unStreamConnectionService.streams = [{peerId: 'peerId'}];
                    unStreamConnectionService.call('peerId', 'streamType', {meta: 'data'});

                    rootScope.$apply();

                    expect(BrokerService.connectStream).not.toHaveBeenCalled();
                });
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

                expect(unStreamConnectionService.streams).toEqual([{peerId: 'otherClient'}]);
            });
        });
        describe('add', function () {
            var connectionMock,
                callBackMock = {},
                streamObject;

            beforeEach(function () {
                connectionMock = {
                    peer: 'clientPeerId',
                    options: {
                        metadata: {
                            channel: 'streamChannel'
                        }
                    },
                    on: function () {

                    }
                };
                streamObject = {
                    video : [],
                    audio : [],
                    getVideoTracks : function(){
                        return this.video;
                    },
                    getAudioTracks : function(){
                        return this.audio;
                    }
                };
                windowService.URL = {
                    createObjectURL : function(){}
                };
                spyOn(windowService.URL,'createObjectURL').and.returnValue('streamObject');
                spyOn(sceService,'trustAsResourceUrl').and.returnValue('trustStream');
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
            it('should call `$window.URL.createObjectURL` with stream' , function(){
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');

                connectionMock.stream(streamObject);

                expect(windowService.URL.createObjectURL).toHaveBeenCalledWith(streamObject);
            });
            it('should set stream.type to `video`, when video track is diefined' , function(){
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');
                streamObject.video.push('video');

                connectionMock.stream(streamObject);

                expect(unStreamConnectionService.streams[0].type).toBe('video');
            });

            it('should set stream.type to `audio`, when audio track is diefined' , function(){
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');
                streamObject.audio.push('audio');

                connectionMock.stream(streamObject);

                expect(unStreamConnectionService.streams[0].type).toBe('audio');
            });
            it('should call `$sce.trustAsResourceUrl` with returnValue from `$window.URL.createObjectURL`' , function(){
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');

                connectionMock.stream(streamObject);

                expect(sceService.trustAsResourceUrl).toHaveBeenCalledWith('streamObject');
            });
            it('should set stream to stream object' , function(){
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');

                connectionMock.stream(streamObject);

                expect(unStreamConnectionService.streams[0].stream).toBe('trustStream');
            });
            it('should change status to `open` after event `stream` triggerd ', function () {
                unStreamConnectionService.add(connectionMock, 'waitingForClientAnswer');
                connectionMock.stream(streamObject);

                expect(unStreamConnectionService.streams[0].status).toBe('open');

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

        describe('_createOwnStream', function () {
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
                        {video: true, audio: true},
                        jasmine.any(Function),
                        jasmine.any(Function)
                    );
                });

                it('should call api with audi', function () {
                    unStreamConnectionService._createOwnStream('audio');
                    rootScope.$apply();
                    expect(fakeUserMedia.api).toHaveBeenCalledWith(
                        {video: false, audio: true},
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
                        spyOn(rootScope,'$broadcast').and.returnValue(true);
                    });
                    it('should broadcast `StreamAddOwn`', function () {
                        userMediaSuccess('stream');
                        expect(rootScope.$broadcast).toHaveBeenCalledWith('StreamAddOwn',{});
                    });

                    it('should store video stream to `Stream.ownStream`', function () {
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

        describe('getOwnStream', function () {
            it('shout return null, when type isn\'t defined', function () {
                expect(unStreamConnectionService.getOwnStream('text')).toBe(null);
            });

            it('shout return defined data from `api.ownStream[type]`', function () {
                unStreamConnectionService.ownStream = {
                    'test': 'data'
                };
                expect(unStreamConnectionService.getOwnStream('test')).toBe('data');
            });
        });

        describe('_broadcastStreamUpdate', function () {
            beforeEach(function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                spyOn(unStreamConnectionService, 'getList').and.returnValue('testValue');
            });
            it('should call `unStreamConnection.unStreamConnectionService` with status: `waitingForYourAnswer`', function () {
                unStreamConnectionService._broadcastStreamUpdate();
                rootScope.$apply();

                expect(unStreamConnectionService.getList).toHaveBeenCalledWith({status: 'waitingForYourAnswer'});
            });
            it('should call `$rootScope.$broadcast` with `StreamUpdate` and return value from unStreamConnection.getList', function () {
                unStreamConnectionService._broadcastStreamUpdate();
                rootScope.$apply();

                expect(rootScope.$broadcast).toHaveBeenCalledWith('StreamUpdate', {waitingClients: 'testValue'});
            });
            describe('no streams open or waiting' , function(){
               beforeEach(function(){
                   unStreamConnectionService.ownStream = {test : 'data'};
                   unStreamConnectionService.streams = [];
               });
                it('should call `$rootScope.$broadcast` with `StreamUpdate` and return value from unStreamConnection.getList', function () {
                    unStreamConnectionService._broadcastStreamUpdate();
                    rootScope.$apply();

                    expect(rootScope.$broadcast).toHaveBeenCalledWith('StreamRemoveOwn', {});
                });
                it('shoud remove ownStream ' , function() {
                    unStreamConnectionService._broadcastStreamUpdate();

                    expect(unStreamConnectionService.ownStream).toEqual({});
                });
            });

        });

    });
});