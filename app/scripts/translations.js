angular.module('gettext').run(['gettextCatalog', function (gettextCatalog) {
/* jshint -W100 */
    gettextCatalog.setStrings('de', {"waiting ...":"warten ...","{{userMap[connection.peerId].label}} is calling":"{{userMap[connection.peerId].label}} ruft an"});
/* jshint +W100 */
}]);