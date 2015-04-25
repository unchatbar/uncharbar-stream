'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-data-chat.directive:unStreamWaitingForYourAnswer
 * @restrict E
 * @description
 *
 * message box
 *
 */
angular.module('unchatbar-stream').directive('unStreamWaitingForYourAnswer', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-stream/waiting-for-your-answer.html';
            },
            controller: 'unStreamConnection',
            scope: {
                userMap: '='

            },
            link: function (scope) {
                scope.getStreamsWaitingForYourAnswer();

                scope.$on('StreamUpdate' , function(){
                    scope.getStreamsWaitingForYourAnswer();
                });
            }
        };
    }
]);
