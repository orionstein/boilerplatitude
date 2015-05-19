
App = angular
  .module 'angular'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    mainState =
      name: 'core.angular'
      url: 'angular'
      templateUrl: 'partials/angular/templates/main.template'

    $stateProvider.state mainState
])

module.exports = App
