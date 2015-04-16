
App = angular
  .module 'feature'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    coreState =
      name: 'core'
      abstract: 'true'
      url: '/'
      template: '<ui-view></ui-view>'

    mainState =
      name: 'core.main'
      url: ''
      template: '<div>Here is the First Feature Page</div>'

    $stateProvider.state coreState
    $stateProvider.state mainState
    
])

module.exports = App
