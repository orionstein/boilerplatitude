
angular
  .module 'main'
  .controller 'mainController', ['featureService', (featureService) ->
    class MainCtrl
      @features = featureService.featurelist
  ] 
  .controller 'menuController', ['featureService', (featureService) ->
    class MenuCtrl
      @features = featureService.featurelist
  ] 
