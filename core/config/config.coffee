
App = angular
  .module 'coreApp'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise '/'
    
])

module.exports = App
