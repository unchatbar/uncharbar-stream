describe('Directive: unStreamOwn', function () {
    var build = function () {
    }, unsStreamConnectionService,windowService;

    beforeEach(module('test/mock/views/unchatbar-stream/own.html'));
    beforeEach(module('unchatbar-stream'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache,$window,unStreamConnection) {
        unsStreamConnectionService = unStreamConnection;
        windowService = $window;
        var template = $templateCache.get('test/mock/views/unchatbar-stream/own.html');
        $templateCache.put("views/unchatbar-stream/own.html",
            template
        );
        windowService.URL = {
            createObjectURL : function(){}
        };
        build = function () {
            var element = $compile("<un-stream-own></un-stream-own>")($rootScope);
            $rootScope.$digest();

            return element;
        };
    }));


    describe('check html', function () {
        it('should set `scope.isVsisible` to true, when own video stream exists', function () {
            spyOn(unsStreamConnectionService,'getOwnStream').and.returnValue('stream');

            var element = build();
            element.scope().$broadcast('StreamRemoveOwn',{});

            expect(element.html()).toContain("isVsisible:true");
        });

        it('should call `windowService.URL.createObjectURL` to have been called with own stream', function () {
            spyOn(unsStreamConnectionService,'getOwnStream').and.returnValue('stream');
            spyOn(windowService.URL,'createObjectURL').and.returnValue('streamObject');
            var element = build();
            element.scope().$broadcast('StreamRemoveOwn',{});

            expect(windowService.URL.createObjectURL).toHaveBeenCalledWith('stream');
        });


        it('should set `scope.isVsisible` to false, when no own video stream exists', function () {
            spyOn(unsStreamConnectionService,'getOwnStream').and.returnValue(null);

            var element = build();
            element.scope().$broadcast('StreamRemoveOwn',{});

            expect(element.html()).toContain("isVsisible:false");
        });

    });

    describe('check events' , function(){
        describe('StreamRemoveOwn' , function(){
            it('call `unsStreamConnection.getOwnStream` with video', function () {
                var element = build();
                spyOn(unsStreamConnectionService,'getOwnStream').and.returnValue('ownStream');
                element.scope().$broadcast('StreamRemoveOwn',{});

                expect(unsStreamConnectionService.getOwnStream).toHaveBeenCalledWith('video');
            });
        });

        describe('StreamAddOwn' , function(){
            it('call `unsStreamConnection.getOwnStream` with video', function () {
                var element = build();
                spyOn(unsStreamConnectionService,'getOwnStream').and.returnValue('ownStream');
                element.scope().$broadcast('StreamAddOwn',{});

                expect(unsStreamConnectionService.getOwnStream).toHaveBeenCalledWith('video');
            });
        }) ;
    });

});