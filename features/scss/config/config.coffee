
App = angular
  .module 'scss'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    mainState =
      name: 'core.scss'
      url: 'scss'
      templateUrl: 'partials/scss/templates/main.template.html'

    $stateProvider.state mainState
    
])

module.exports = App
