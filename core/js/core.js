(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App;

App = angular.module('coreApp').config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    return $urlRouterProvider.otherwise('/');
  }
]);

module.exports = App;



},{}],2:[function(require,module,exports){
var App, Dependencies, Features;

Features = require('../../features/features');

Dependencies = ['ui.router'];

Dependencies = Dependencies.concat(Object.keys(Features));

console.log(Dependencies);

App = angular.module('coreApp', Dependencies);

require('./config');



},{"../../features/features":7,"./config":1}],3:[function(require,module,exports){
var App;

App = angular.module('featureTwo').config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var coreState, mainState;
    coreState = {
      name: 'featureTwo',
      abstract: 'true',
      url: '/featureTwo',
      template: '<ui-view></ui-view>'
    };
    mainState = {
      name: 'featureTwo.main',
      url: '',
      templateUrl: 'features/featureTwo/templates/main.template'
    };
    $stateProvider.state(coreState);
    return $stateProvider.state(mainState);
  }
]);

module.exports = App;



},{}],4:[function(require,module,exports){
var App;

App = angular.module('featureTwo', ['ui.router']);

require('./config/config');



},{"./config/config":3}],5:[function(require,module,exports){
var App;

App = angular.module('feature').config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var coreState, mainState;
    coreState = {
      name: 'core',
      abstract: 'true',
      url: '/',
      template: '<ui-view></ui-view>'
    };
    mainState = {
      name: 'core.main',
      url: '',
      template: '<div>Here is the First Feature Page</div>'
    };
    $stateProvider.state(coreState);
    return $stateProvider.state(mainState);
  }
]);

module.exports = App;



},{}],6:[function(require,module,exports){
var App;

App = angular.module('feature', ['ui.router']);

require('./config/config');



},{"./config/config":5}],7:[function(require,module,exports){
var Features;

Features = {
  feature: require('./feature/feature'),
  featureTwo: require('./featureTwo/feature')
};

module.exports = Features;



},{"./feature/feature":6,"./featureTwo/feature":4}]},{},[2])