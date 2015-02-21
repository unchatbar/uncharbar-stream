describe('Directive: unStreamWaitingForClientAnswer', function () {
    var build = function () {
    }, unsStreamConnectionService;

    beforeEach(module('test/mock/views/unchatbar-stream/waiting-for-client-answer.html'));
    beforeEach(module('unchatbar-stream'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache,unStreamConnection) {
        unsStreamConnectionService = unStreamConnection;
        var template = $templateCache.get('test/mock/views/unchatbar-stream/waiting-for-client-answer.html');
        $templateCache.put("views/unchatbar-stream/waiting-for-client-answer.html",
            template
        );
        build = function () {
            var element = $compile("<un-stream-waiting-for-client-answer  " +
            "data-user-map=\"{userA :{id:'userA',label: 'labelUserA'}}\"></un-stream-waiting-for-client-answer>")($rootScope);
            $rootScope.$digest();

            return element;
        };
    }));
    describe('check init', function () {
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
                {peerId: 'userA'}
            ]);
            element = build();
        });

        it('should contain label from first user', inject(function ($rootScope) {
            expect(element.html()).toContain("labelUserA");
        }));
    });

    describe('check events' , function(){
        describe('StreamUpdate' , function(){
            it('should call `unsStreamConnectionService.getList` with status waitingForClientAnswer', function () {
                var element = build();
                spyOn(unsStreamConnectionService,'getList').and.returnValue([
                    {peerId: 'userA'}
                ]);
                element.isolateScope().$broadcast('StreamUpdate',{});

                expect(unsStreamConnectionService.getList).toHaveBeenCalledWith({status : 'waitingForClientAnswer'});
            });
        }) ;
    });

});