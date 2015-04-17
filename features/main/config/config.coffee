
angular
  .module 'main'
  .config ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    coreState =
      name: 'core'
      abstract: 'true'
      url: '/'
      template: '<ui-view></ui-view>'

    mainState =
      name: 'core.main'
      url: ''
      controller: 'mainController as main'
      templateUrl: 'features/main/templates/main.template'

    $stateProvider.state coreState
    $stateProvider.state mainState
    
]
