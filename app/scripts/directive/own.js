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
angular.module('unchatbar-stream').directive('unStreamOwn', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: 'views/unchatbar-stream/own.html',
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
                        element.find('video').prop('src', URL.createObjectURL(scope.ownStream));
                        scope.isVsisible = true;
                    } else {
                        scope.isVsisible = false;
                    }
                }
            }
        };
    }
]);
