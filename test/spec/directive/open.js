describe('Directive: unStreamOpen', function () {
    var build = function () {
    }, unsStreamConnectionService;

    beforeEach(module('test/mock/views/unchatbar-stream/open.html'));
    beforeEach(module('unchatbar-stream'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache,unStreamConnection) {
        unsStreamConnectionService = unStreamConnection;
        var template = $templateCache.get('test/mock/views/unchatbar-stream/open.html');
        $templateCache.put("views/unchatbar-stream/open.html",
            template
        );
        build = function () {
            var element = $compile("<un-stream-open data-channel=\"{{'channelA'}}\" " +
            " data-user-map=\"{userA :{id:'userA',label: 'labelUserA'}}\"></un-stream-open>")($rootScope);
            $rootScope.$digest();

            return element;
        };
    }));
    describe('check init', function () {
        describe('channel' , function() {
            it('should have the value from attribute `channel`', function () {
                var element = build();
                expect(element.isolateScope().channel).toBe('channelA');
            });
        });
        describe('userMap' , function(){
            it('should have the value from attribute `user-map`', function () {
                var element = build();
                expect(element.isolateScope().userMap).toEqual({userA :{id:'userA',label: 'labelUserA'}});
            });
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            spyOn(unsStreamConnectionService,'getList').and.returnValue([
                {peerId: 'userA',type: 'testType',stream : 'testStream'}
            ]);
            element = build();
        });

        it('should contain label from first user', inject(function ($rootScope) {
            expect(element.html()).toContain("labelUserA");
        }));

        it('should contain type from connection', inject(function ($rootScope) {
            expect(element.html()).toContain("testType");
        }));

        it('should contain stream from connection', inject(function ($rootScope) {
            expect(element.html()).toContain("testStream");
        }));
    });

    describe('check events' , function(){
        describe('StreamUpdate' , function(){
            it('should call `unsStreamConnectionService.getList` with channel and status open', function () {
                var element = build();
                spyOn(unsStreamConnectionService,'getList').and.returnValue([
                    {peerId: 'userA',type: 'testType',stream : 'testStream'}
                ]);
                element.isolateScope().$broadcast('StreamUpdate',{});

                expect(unsStreamConnectionService.getList).toHaveBeenCalledWith({channel : 'channelA',status : 'open'});
            });
        }) ;
    });

});