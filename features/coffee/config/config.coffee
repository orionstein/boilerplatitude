
App = angular
  .module 'coffee'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    mainState =
      name: 'core.coffee'
      url: 'coffee'
      templateUrl: 'partials/coffee/templates/main.template'

    $stateProvider.state mainState
    
])

module.exports = App
