'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-data-chat.directive:unDataChatUnreadMessage
 * @restrict E
 * @description
 *
 * message box
 *
 */
angular.module('unchatbar-stream').directive('unStreamCall', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'views/unchatbar-stream/call.html',
            controller: 'unStreamConnection',
            scope: {
                channel: '@',
                userMap: '='

            },
            link: function (scope) {

            }
        };
    }
]);
