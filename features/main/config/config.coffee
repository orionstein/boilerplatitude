
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
      templateUrl: 'partials/main/templates/main.template'


    pageLayoutState =
      name: 'core.sub'
      abstract: true
      template: '<div class="main"><div class="menu" ui-view="menu"></div><div class="content" ui-view="main"></div></div>'

    pageState =
      name: 'core.sub.page'
      abstract: true
      views:
          'menu':
              templateUrl: 'partials/main/templates/menu.template'
              controller: 'menuController as menu'
          'main':
              template: '<ui-view></ui-view>'



    $stateProvider.state coreState
    $stateProvider.state mainState
    $stateProvider.state pageLayoutState
    $stateProvider.state pageState
    
]
