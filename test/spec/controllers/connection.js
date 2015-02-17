'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-stream'));

    var streamCTRL, scope, unStreamConnectionService;

    beforeEach(inject(function ($controller, $rootScope,unStreamConnection) {
        unStreamConnectionService = unStreamConnection;
        scope = $rootScope.$new();

        streamCTRL = function () {
            $controller('unContactClient', {
                $scope: scope,
                unStreamConnection: unStreamConnectionService
            });
        };
    }));

    describe('check methode', function () {


    });


});
