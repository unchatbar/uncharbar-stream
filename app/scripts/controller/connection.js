'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-stream.controller:unStreamConnection
 * @require $scope
 * @require unStreamConnection
 * @description
 *
 * client controller
 *
 */
angular.module('unchatbar-stream').controller('unStreamConnection', ['$scope', '$q', 'unStreamConnection',
    function ($scope, $q, unStreamConnection) {
        /**
         * @ngdoc methode
         * @name openStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Array} list of open stream
         */
        $scope.openStream = [];

        /**
         * @ngdoc methode
         * @name streamsWaitingForYourAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Array} list of stream waiting for your answer
         */
        $scope.streamsWaitingForYourAnswer = [];

        /**
         * @ngdoc methode
         * @name streamsWaitingForClientAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Array} list of stream waiting for client answer
         */
        $scope.streamsWaitingForClientAnswer = [];

        /**
         * @ngdoc methode
         * @name ownStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Object} own stream object
         */
        $scope.ownStream = $scope.ownStream || null;

        /**
         * @ngdoc methode
         * @name call
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {Array} users list of client peer id
         * @params {String} stream type [video/audio]
         * @params {String} channel for stream
         * @description
         *
         * call to user
         *
         */
        $scope.call = function (users, type, channel) {
            unStreamConnection.createOwnStream(type).then(function () {
                _.forEach(users, function (user) {
                    unStreamConnection.call(user.id, type,
                        {
                            channel: channel,
                            users: users || []
                        });
                });
            });
        };

        /**
         * @ngdoc methode
         * @name closeStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} peerId client peerId
         * @params {String} stream type [video/audio]
         * @description
         *
         * close stream connection
         *
         */
        $scope.answer = function (peerId, type) {
            unStreamConnection.createOwnStream(type).then(function () {
                unStreamConnection.answer(peerId, type);
                var streamConnection = unStreamConnection.get(peerId);
                $scope.call(streamConnection.meta.users || [],type,streamConnection.meta.channel);
            });
        };


        /**
         * @ngdoc methode
         * @name closeStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} peerId client peerId
         * @description
         *
         * close stream connection
         *
         */
        $scope.close = function (peerId) {
            unStreamConnection.close(peerId);
        };

        /**
         * @ngdoc methode
         * @name getOpenStreams
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} channel id of channel
         * @return {Array} users list of user clientPeer id
         * @description
         *
         * get list of open streams
         *
         */
        $scope.getOpenStreams = function (channel) {
            var filter = {status: 'open'};
            if (channel) {
                filter.channel = channel;
            }
            $scope.openStream = unStreamConnection.getList(filter);
        };

        /**
         * @ngdoc methode
         * @name getStreamsWaitingForYourAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} channel id of channel
         * @description
         *
         * get list of streams, waiting for your answer
         *
         */
        $scope.getStreamsWaitingForYourAnswer = function (channel) {
            var filter = {status: 'waitingForYourAnswer'};
            if (channel) {
                filter.channel = channel;
            }
            $scope.streamsWaitingForYourAnswer = unStreamConnection.getList(filter);
        };

        /**
         * @ngdoc methode
         * @name getStreamsWaitingForClientAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} channel id of channel
         * @description
         *
         * get list of streams, waiting for client answer
         *
         */
        $scope.getStreamsWaitingForClientAnswer = function (channel) {
            var filter = {status: 'waitingForClientAnswer'};
            if (channel) {
                filter.channel = channel;
            }
            $scope.streamsWaitingForClientAnswer = unStreamConnection.getList(filter);
        };

        /**
         * @ngdoc methode
         * @name getOwnStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @params {String} type type of own stream (e.g video/audio)
         * @description
         *
         * get own stream object
         *
         */
        $scope.getOwnStream = function (type) {
            $scope.ownStream = unStreamConnection.getOwnStream(type);
        };
    }
]);