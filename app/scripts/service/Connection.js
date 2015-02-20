'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc service
 * @name unchatbar-stream.unStreamConnection
 * @description
 * # peer
 * stream connection
 */
angular.module('unchatbar-stream').service('unStreamConnection', ['$rootScope', '$q', '$window', '$sce', 'Broker',
    function ($rootScope, $q, $window, $sce, Broker) {
        var possibleStatus = ['waitingForYourAnswer', 'waitingForClientAnswer', 'open'];
        var api = {
            /**
             * @ngdoc methode
             * @name streams
             * @propertyOf unchatbar-stream.unStreamConnection
             * @private
             * @returns {Array} list of all stream
             *
             */
            streams: [],

            /**
             * @ngdoc methode
             * @name metaIndexFields
             * @propertyOf unchatbar-stream.unStreamConnection
             * @private
             * @returns {Array} list of index fields in connection - metaData for searching
             *
             */
            metaIndexFields: ['channel'],
            /**
             * @ngdoc methode
             * @name ownStream
             * @propertyOf unchatbar-stream.unStreamConnection
             * @private
             * @returns {Object} own stream Object
             *
             */
            ownStream: {},

            /**
             * @ngdoc methode
             * @name call
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {String} peerId client peer id
             * @params {String} stream type [video/audio]
             * @params {Object} meta data for stream
             * @description
             *
             * call to client
             *
             */
            call: function (peerId, type, metaData) {
                if (Broker.getPeerId() !== peerId) {
                    this._createOwnStream(type).then(function (stream) {
                        if (-1 === _.findIndex(api.streams, {'peerId': peerId})) {
                            var connection = Broker.connectStream(peerId, stream, metaData);
                            api.add(connection, 'waitingForClientAnswer');
                        }
                    });
                }
            },

            /**
             * @ngdoc methode
             * @name answer
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {String} peerId client peerId
             * @params {String} stream type [video/audio]
             * @description
             *
             * answer to client stream
             *
             */
            answer: function (peerId, type) {
                this._createOwnStream(type).then(function (stream) {
                    var index = _.findIndex(api.streams, {'peerId': peerId});
                    api.streams[index].connection.answer(stream);
                });
            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {String} peerId client peerId
             * @description
             *
             * close stream
             *
             */
            close: function (peerId) {
                var index = _.findIndex(api.streams, {'peerId': peerId});
                api.streams[index].connection.close();
                api.streams.splice(index, 1);
                api._broadcastStreamUpdate();
            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {Object} connection stream connection
             * @params {status} status status of stream
             * @description
             *
             * add a new stream
             *
             */
            add: function (connection, status) {
                var stream = {
                    peerId: connection.peer,
                    status: status,
                    connection: connection
                };
                var options = connection.options || {};
                _.forEach(api.metaIndexFields, function (field) {
                    stream[field] = options.metadata[field] || '';
                });

                api.streams.push(stream);
                api._broadcastStreamUpdate();
                connection.on('stream', function (stream) {
                    var streamType = '';
                    var index = _.findIndex(api.streams, {'peerId': this.peer});
                    if (stream.getVideoTracks()[0]) {
                        streamType = 'video';
                    }else if (stream.getAudioTracks()[0]) {
                        streamType = 'audio';
                    }
                    api.streams[index].status = 'open';
                    api.streams[index].type = streamType;
                    api.streams[index].stream = $sce.trustAsResourceUrl($window.URL.createObjectURL(stream));
                    api._broadcastStreamUpdate();
                    $rootScope.$apply();
                });
            },


            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {Objject} filter filter by status or channel
             * @params {String} channel name of channel
             * @return {Array} list of streams
             * @description
             *
             * get a list of stream filter by user and status
             *
             */
            getList: function (filter) {
                return _.filter(api.streams, filter);
            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {type} stream type [video/audio]
             * @return {Object} promise for own stream object
             * @description
             *
             * create own stream
             *
             */
            _createOwnStream: function (type) {
                var defer = $q.defer();
                navigator.getUserMedia = this._getUserMediaApi();
                if (navigator.getUserMedia === 0) {
                    defer.reject('no media api');
                } else if (this.getOwnStream(type)) {
                    defer.resolve(this.getOwnStream(type));
                } else {
                    navigator.getUserMedia(
                        {
                            video: type === 'video' ? true : false,
                            audio: true
                        },
                        function (stream) {
                            api.ownStream[type] = stream;
                            /**
                             * @ngdoc event
                             * @name StreamAddOwn
                             * @eventOf unchatbar-stream.unStreamConnection
                             * @eventType broadcast on root scope
                             * @description
                             *
                             * new own stream created
                             *
                             */
                            $rootScope.$broadcast('StreamAddOwn', {});
                            $rootScope.$apply();
                            defer.resolve(stream);
                        }.bind(this),
                        function (error) {
                            return defer.reject(error);
                        }
                    );
                }
                return defer.promise;
            },

            /**
             * @ngdoc methode
             * @name _getUserMediaApi
             * @methodOf unchatbar-stream.unStreamConnection
             * @returns {Object} usermedia Api
             * @private
             * @description
             *
             * get usermedia api for browser
             *
             */
            _getUserMediaApi: function () {
                return ( navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia);
            },


            /**
             * @ngdoc methode
             * @name getOwnStream
             * @methodOf unchatbar-stream.unStreamConnection
             * @return {Object} own stream object
             * @description
             *
             * get own stream
             *
             */
            getOwnStream: function (type) {
                return api.ownStream[type] || null;
            },

            /**
             * @ngdoc event
             * @name StreamUpdate
             * @eventOf unchatbar-stream.unStreamConnection
             * @eventType broadcast on root scope
             * @description
             *
             * event for stream update
             *
             */
            _broadcastStreamUpdate: function () {
                if (api.streams.length === 0) {
                    api.ownStream = {};
                    $rootScope.$broadcast('StreamRemoveOwn', {});
                }
                $rootScope.$broadcast('StreamUpdate',
                    {
                        waitingClients: api.getList({status: 'waitingForYourAnswer'})
                    }
                );
            }
        };

        return api;
    }
])
;
