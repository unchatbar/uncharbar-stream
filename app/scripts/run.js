'use strict';
/**
 * @ngdoc overview
 * @name unchatbar-stream
 * @description
 * # unchatbar-stream-connection
 *
 * Main module of the application.
 */
angular.module('unchatbar-stream').run(['$rootScope','unStreamConnection',
    function ($rootScope,unStreamConnection ) {
        $rootScope.$on('BrokerPeerCall',function(call){
            unStreamConnection.add(call.client,'waitingForYourAnswer');
        });


    }
]);
