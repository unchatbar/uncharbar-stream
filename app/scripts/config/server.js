'use strict';
angular.module('unchatbar-contact')
    .config(['PhoneBookProvider','BrokerProvider','LOCALSTORAGE',
        function ( PhoneBookProvider, BrokerProvider, LOCALSTORAGE) {
            BrokerProvider.setHost('unchatbar-server.herokuapp.com');
        }]);