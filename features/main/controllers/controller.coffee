
angular
  .module 'main'
  .controller 'mainController', ['featureService', (featureService) ->
    class MainCtrl
      @features = featureService.featurelist
  ] 
