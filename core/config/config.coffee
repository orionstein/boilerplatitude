
App = angular
  .module 'coreApp'
  .config( ['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) ->

    $urlRouterProvider.otherwise '/'
    environment = '/* @echo NODE_ENV */' || ''
    pool = '/* @echo COGNITO_POOL */' || ''
    console.log environment
    console.log pool
])

module.exports = App
