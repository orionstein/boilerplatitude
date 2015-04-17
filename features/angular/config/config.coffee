
App = angular
  .module 'featureTwo'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    coreState =
      name: 'featureTwo'
      abstract: 'true'
      url: '/featureTwo'
      template: '<ui-view></ui-view>'

    mainState =
      name: 'featureTwo.main'
      url: ''
      templateUrl: 'features/featureTwo/templates/main.template'

    $stateProvider.state coreState
    $stateProvider.state mainState
    
])

module.exports = App
