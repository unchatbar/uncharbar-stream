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
angular.module('unchatbar-stream').directive('unStreamWaitingForClientAnswer', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-stream/waiting-for-client-answer.html';
            },
            controller: 'unStreamConnection',
            scope: {
                userMap: '='

            },
            link: function (scope) {
                scope.getStreamsWaitingForClientAnswer();

                scope.$on('StreamUpdate' , function(){
                    scope.getStreamsWaitingForClientAnswer();
                });
            }
        };
    }
]);
