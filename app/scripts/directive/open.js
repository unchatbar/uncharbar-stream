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
angular.module('unchatbar-stream').directive('unStreamOpen', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-stream/open.html';
            },
            controller: 'unStreamConnection',
            scope: {
                channel: '@',
                userMap: '='

            },
            link: function (scope) {
                scope.getOpenStreams(scope.channel);

                scope.$on('StreamUpdate' , function(){
                    scope.getOpenStreams(scope.channel);
                });

            }

        };
    }
]);
