
App = angular
  .module 'static'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    mainState =
      name: 'core.sub.page.static'
      url: 'static'
      templateUrl: 'partials/static/templates/main.template'

    $stateProvider.state mainState
    
])

module.exports = App
