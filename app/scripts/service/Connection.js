'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc service
 * @name unchatbar-stream.unStreamConnection
 * @description
 * # peer
 * stream connection
 */
angular.module('unchatbar-stream').service('unStreamConnection', ['$rootScope', '$q',
    function ($rootScope, $q) {
        var possibleStatus = ['waitingForYourAnswer','waitingForClientAnswer','open'];
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
             * @name call
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {Array} users list of users
             * @params {type} stream type [video/audio]
             * @description
             *
             * call to client
             *
             */
            call : function(user,type) {

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
            answer : function(peerId){

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
            close : function(peerId) {

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
            add : function(connection,status) {

            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {String} peerId client peerId
             * @params {status} status status of stream
             * @description
             *
             * update a stream
             *
             */
            update : function(peerId,status) {

            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {status} status status of stream
             * @params {String} peerId client peerId
             * @return {Array} list of streams
             * @description
             *
             * get a list of stream filter by user and status
             *
             */
            getList : function(status,users){

            },

            /**
             * @ngdoc methode
             * @name close
             * @methodOf unchatbar-stream.unStreamConnection
             * @params {type} stream type [video/audio]
             * @return {Object} promise for own stream object
             * @description
             *
             * get own stream
             *
             */
            _createOwnStream : function(type){

            }


        };

        return api;
    }
]);
