angular.module('unchatbar-stream').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-stream/call-audio.html',
    "<div class=\"un-stream-call-audio\">\n" +
    "    <a data-ng-click=\"call(userMap,'audio', channel)\">\n" +
    "        <i class=\"fa fa-video-camera fa-3x\"></i>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/call-video.html',
    "<div class=\"un-stream-call-video\">\n" +
    "    <a class=\"\" data-ng-click=\"call(userMap,'video', channel)\">\n" +
    "        <i class=\"fa fa-video-camera fa-3x\"></i>\n" +
    "    </a>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/open.html',
    "<div class=\"un-stream-call-open\">\n" +
    "    <div>\n" +
    "        <div data-ng-repeat=\"connection in openStream \" class=\"un-stream-item\">\n" +
    "            <div data-ng-if=\"connection.type === 'video'\">\n" +
    "                <video autoplay=\"autoplay\" controls=\"true\" data-ng-src=\"{{connection.stream}}\"></video>\n" +
    "            </div>\n" +
    "            <div data-ng-if=\"connection.type === 'audio'\">\n" +
    "                <img ng-src=\"{{userMap[connection.peerId].image}}\">\n" +
    "                <audio class=\"client-audio\" autoplay=\"autoplay\" controls=\"true\" autoplay\n" +
    "                       data-ng-src=\"{{connection.stream}}\"></audio>\n" +
    "            </div>\n" +
    "            <a href=\"#\" class=\"cancel-call\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                <i></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"un-stream-clear\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/own.html',
    "<div class=\"un-stream-own\">\n" +
    "    <video autoplay=\"autoplay\" controls=\"true\" muted data-ng-show=\"isVsisible\" ></video>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-client-answer.html',
    "<div class=\"un-stream-waiting-for-client-answer\">\n" +
    "    <div>\n" +
    "        <div data-ng-repeat=\"connection in streamsWaitingForClientAnswer\">\n" +
    "            <img ng-src=\"{{userMap[connection.peerId].image}}\">\n" +
    "\n" +
    "            <i class=\"waiting-icon\"></i>\n" +
    "            <p translate>waiting ...</p>\n" +
    "            <a href=\"#\" class=\"stream-video-cancel\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                <i></i>\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"un-stream-clear\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-your-answer.html',
    "<div class=\"un-stream-waiting-for-your-answer\">\n" +
    "    <div>\n" +
    "        <div data-ng-repeat=\"connection in streamsWaitingForYourAnswer\">\n" +
    "            <img ng-src=\"{{userMap[connection.peerId].image}}\">\n" +
    "            <i class=\"waiting-icon\"></i>\n" +
    "\n" +
    "            <p translate>{{userMap[connection.peerId].label}} is calling</p>\n" +
    "\n" +
    "            <div class=\"un-stream-option\">\n" +
    "                <a href=\"#\" class=\"answer-audio\" data-ng-click=\"answer(connection.peerId,'audio')\">\n" +
    "                    <i></i>\n" +
    "                </a>\n" +
    "                <a class=\"answer-video\" data-ng-click=\"answer(connection.peerId,'video')\">\n" +
    "                    <i></i>\n" +
    "                </a>\n" +
    "                <a class=\"stream-video-cancel\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                    <i></i>\n" +
    "                </a>\n" +
    "\n" +
    "                <div class=\"un-stream-clear\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
