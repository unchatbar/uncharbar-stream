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
angular.module('unchatbar-stream').controller('unStreamConnection', ['$scope', 'unStreamConnection',
    function ($scope, unStreamConnection) {
        /**
         * @ngdoc methode
         * @name streamList
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Array} list of stream
         */
        $scope.streamList = [];

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
        $scope.ownStream = null;

        /**
         * @ngdoc methode
         * @name getOpenStreams
         * @params {Array} users list of users
         * @params {type} stream type [video/audio]
         * @description
         *
         * call to user
         *
         */
        $scope.callUser = function (users, type) {
            unStreamConnection.call(users, type);
        };

        /**
         * @ngdoc methode
         * @name closeStream
         * @params {String} peerId client peerId
         * @description
         *
         * close stream connection
         *
         */
        $scope.closeStream = function (peerId) {
            unStreamConnection.close(peerId);
        };


        /**
         * @ngdoc methode
         * @name getStreamsWaitingForAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @description
         *
         * get list of streams, waiting for your answer
         *
         */
        $scope.getStreamsWaitingForAnswer = function () {
            $scope.streamsWaitingForYourAnswer = unStreamConnection.getList('waitingForYourAnswer');
        };

        /**
         * @ngdoc methode
         * @name getOpenStreams
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @return {Array} users list of user clientPeer id
         * @description
         *
         * get list of open streams
         *
         */
        $scope.getOpenStreams = function (users) {
            $scope.streamsWaitingForYourAnswer = unStreamConnection.getList('open');
        };

        /**
         * @ngdoc methode
         * @name getStreamsWaitingForClientAnswer
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @description
         *
         * get list of streams, waiting for client answer
         *
         */
        $scope.getStreamsWaitingForClientAnswer = function (users) {
            $scope.streamsWaitingForClientAnswer = unStreamConnection.getList('waitingForClientAnswer');
        };

        /**
         * @ngdoc methode
         * @name getOwnStream
         * @methodOf unchatbar-stream.controller:unStreamConnection
         * @description
         *
         * get own stream object
         *
         */
        $scope.getOwnStream = function (users) {
            $scope.ownStream = unStreamConnection.getOwnStream('video');
        };
    }
]);