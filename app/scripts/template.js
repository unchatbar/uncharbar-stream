angular.module('unchatbar-stream').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-stream/call.html',
    "<div>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"call(userMap,'video', channel)\">video call</button>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"call(userMap,'audio', channel)\">audio call</button>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/open.html',
    "<div>\n" +
    "    <div data-ng-repeat=\"connection in openStream\">\n" +
    "        type : {{connection.type}}<br>\n" +
    "        {{userMap[connection.peerId].label}} ({{connection.peerId}})\n" +
    "        <div data-ng-if=\"connection.type === 'video'\">\n" +
    "            <video autoplay=\"autoplay\" controls=\"true\" data-ng-src=\"{{connection.stream}}\" width=\"200\"></video>\n" +
    "        </div>\n" +
    "        <div data-ng-if=\"connection.type === 'audio'\">\n" +
    "            <audio autoplay=\"autoplay\" controls=\"true\" autoplay data-ng-src=\"{{connection.stream}}\" width=\"200\"></audio>\n" +
    "        </div>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(connection.peerId)\">cancel</button>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/own.html',
    "<div>\n" +
    "    <video autoplay=\"autoplay\" controls=\"true\" data-ng-show=\"isVsisible\" width=\"200\" ></video>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-client-answer.html',
    "<div >\n" +
    "    <div data-ng-repeat=\"connection in streamsWaitingForClientAnswer\">\n" +
    "        {{userMap[connection.peerId].label}} ({{connection.peerId}})\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(connection.peerId)\">cancel</button>\n" +
    "        <hr>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-your-answer.html',
    "<div >\n" +
    "    <div data-ng-repeat=\"connection in streamsWaitingForYourAnswer\">\n" +
    "        {{userMap[connection.peerId].label}} ({{connection.peerId}})\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"answer(connection.peerId,'video')\">video</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"answer(connection.peerId,'audio')\">audio call</button>\n" +
    "        <button type=\"button\" class=\"btn btn-default\" data-ng-click=\"close(connection.peerId)\">cancel</button>\n" +
    "        <hr>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
