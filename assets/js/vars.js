var app = angular.module('app', ["ROUTING", "ngDraggable", "AUTH", "TRACKER"]);
var TRACKER = angular.module('TRACKER', ['ROUTING', 'firebase']);
var ROUTING = angular.module('ROUTING', ["ngRoute"]);
var AUTH = angular.module('AUTH', ["ROUTING", "firebase"]);
