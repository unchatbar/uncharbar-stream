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
angular.module('unchatbar-stream').directive('unStreamOwn', ['$window',
    function ($window) {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-stream/own.html';
            },
            controller: 'unStreamConnection',
            link: function (scope,element) {
                scope.isVsisible = false;

                createStreamSource();

                scope.$on('StreamAddOwn',function(){
                    createStreamSource();
                });

                scope.$on('StreamRemoveOwn',function(){
                    createStreamSource();
                });


                function createStreamSource () {
                    scope.getOwnStream('video');
                    if (scope.ownStream){
                        element.find('video').prop('src', $window.URL.createObjectURL(scope.ownStream));
                        scope.isVsisible = true;
                    } else {
                        scope.isVsisible = false;
                    }
                }
            }
        };
    }
]);
