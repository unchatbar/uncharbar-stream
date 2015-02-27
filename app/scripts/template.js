angular.module('unchatbar-stream').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/unchatbar-stream/call.html',
    "<div>\n" +
    "    <div class=\"pull-left stream-video\" data-ng-click=\"call(userMap,'audio', channel)\">\n" +
    "        <i class=\"fa fa-phone fa-3x\"></i>\n" +
    "    </div>\n" +
    "    <div class=\"pull-left stream-video\" data-ng-click=\"call(userMap,'video', channel)\">\n" +
    "        <i class=\"fa fa-video-camera fa-3x\"></i>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/open.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-sx-12\">\n" +
    "        <div data-ng-repeat=\"connection in openStream \" class=\"pull-left open-client-container text-center\">\n" +
    "            <div data-ng-if=\"connection.type === 'video'\">\n" +
    "                <video autoplay=\"autoplay\" controls=\"true\" data-ng-src=\"{{connection.stream}}\" width=\"200\"></video>\n" +
    "            </div>\n" +
    "            <div data-ng-if=\"connection.type === 'audio'\">\n" +
    "                <img ng-src=\"{{userMap[connection.peerId].image}}\" width=\"80px\"\n" +
    "                     class=\"profile-image img-thumbnail img-circle img-responsive\">\n" +
    "                <audio class=\"client-audio\" autoplay=\"autoplay\" controls=\"true\" autoplay data-ng-src=\"{{connection.stream}}\"\n" +
    "                       width=\"100\"></audio>\n" +
    "            </div>\n" +
    "            <div class=\"stream-video-cancel\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                <i class=\"fa fa-times fa-3x\"></i>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"clear-fix\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/own.html',
    "<div>\n" +
    "    <video autoplay=\"autoplay\" controls=\"true\" width=\"100px\" data-ng-show=\"isVsisible\" ></video>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-client-answer.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-sx-12\">\n" +
    "        <div data-ng-repeat=\"connection in streamsWaitingForClientAnswer\" class=\"pull-left waiting-client-container\">\n" +
    "            <div class=\"profile-img-container\">\n" +
    "                <img ng-src=\"{{userMap[connection.peerId].image}}\" width=\"80px\"\n" +
    "                     class=\"profile-image img-thumbnail img-circle img-responsive\">\n" +
    "                <i class=\"fa fa-spinner fa-pulse fa-spin fa-5x\"></i>\n" +
    "            </div>\n" +
    "            <p>waiting ...</p>\n" +
    "            <div class=\"stream-video-cancel\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                <i class=\"fa fa-times fa-3x\"></i>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"clear-fix\"></div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('views/unchatbar-stream/waiting-for-your-answer.html',
    "<div class=\"row\">\n" +
    "    <div class=\"col-sx-12\">\n" +
    "        <div data-ng-repeat=\"connection in streamsWaitingForYourAnswer\" class=\"pull-left waiting-your-container text-center\">\n" +
    "            <div class=\"profile-img-container\">\n" +
    "                <img ng-src=\"{{userMap[connection.peerId].image}}\" width=\"80px\"\n" +
    "                     class=\"profile-image img-thumbnail img-circle img-responsive\">\n" +
    "                <i class=\"fa fa-spinner fa-pulse fa-spin fa-5x\"></i>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <div class=\"pull-left stream-video\" data-ng-click=\"answer(connection.peerId,'audio')\">\n" +
    "                    <i class=\"fa fa-phone fa-3x\"></i>\n" +
    "                </div>\n" +
    "                <div class=\"pull-left stream-video\" data-ng-click=\"answer(connection.peerId,'video')\">\n" +
    "                    <i class=\"fa fa-video-camera fa-3x\"></i>\n" +
    "                </div>\n" +
    "                <div class=\"stream-video-cancel\" data-ng-click=\"close(connection.peerId)\">\n" +
    "                    <i class=\"fa fa-times fa-3x\"></i>\n" +
    "                </div>\n" +
    "                <div class=\"clear-fix\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
