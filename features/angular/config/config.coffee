
App = angular
  .module 'angular'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    mainState =
      name: 'core.sub.page.angular'
      url: 'angular'
      templateUrl: 'partials/angular/templates/main.template.html'

    $stateProvider.state mainState
])

module.exports = App
