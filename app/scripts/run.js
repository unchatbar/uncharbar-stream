'use strict';
/**
 * @ngdoc overview
 * @name unchatbar-stream
 * @description
 * # unchatbar-stream-connection
 *
 * run module
 */
angular.module('unchatbar-stream').run(['$rootScope', 'unStreamConnection',
    function ($rootScope, unStreamConnection) {
        $rootScope.$on('BrokerPeerCall', function (event,data) {
            unStreamConnection.add(data.client, 'waitingForYourAnswer');
        });


    }
]);
