describe('Directive: unStreamCall', function () {
    var build = function () {
    }, MessageService;

    beforeEach(module('test/mock/views/unchatbar-stream/call.html'));
    beforeEach(module('unchatbar-stream'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {

        var template = $templateCache.get('test/mock/views/unchatbar-stream/call.html');
        $templateCache.put("views/unchatbar-stream/call.html",
            template
        );
        build = function () {
            var element = $compile("<un-stream-call data-channel=\"{{'channelA'}}\" " +
            " data-user-map=\"{userA :{id:'userA',label: 'labelUserA'}}\"></un-stream-call>")($rootScope);
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

});