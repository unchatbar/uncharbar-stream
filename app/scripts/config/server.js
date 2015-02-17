'use strict';
angular.module('unchatbar-stream')
    .config(['BrokerProvider','LOCALSTORAGE',
        function ( BrokerProvider, LOCALSTORAGE) {
            BrokerProvider.setHost('unchatbar-server.herokuapp.com');
        }]);