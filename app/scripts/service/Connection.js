'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc service
 * @name unchatbar-stream.unStreamConnection
 * @description
 * # peer
 * stream connection
 */
angular.module('unchatbar-stream').service('unStreamConnection', ['$rootScope', '$q', 'Broker',
    function ($rootScope, $q, Broker) {
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
            call: function
                (peerId, type, metaData) {
                this._createOwnStream(type).then(function (stream) {
                    var connection = Broker.connectStream(peerId, stream, metaData);
                    api.add(connection, 'waitingForClientAnswer');
                });
            },

            /**
             * @ngdoc methode
             * @name answer
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {String} peerId client peerId
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

                _.forEach(api.metaIndexFields,function(field){
                    stream[field] =  connection.metaData[field] || '';
                });

                api.streams.push(stream);
                connection.on('stream', function (stream) {
                    var index = _.findIndex(api.streams, {'peerId': this.peer});
                    api.streams[index].status = 'open';
                });
                connection.on('close', function () {
                    var index = _.findIndex(api.streams, {'peerId': this.peer});
                    api.streams.splice(this.peer, 1);
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
            }
        };

        return api;
    }
])
;
