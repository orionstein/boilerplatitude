
angular
  .module 'shared'
  .service 'featureService',
    class Features
      constructor: -> 
        @featurelist = [
          featureName: 'static'
          featureState: 'core.sub.page.static'
          featureDescription: 'I had always had a liking of APIs, and the separation between the API and the Client facing content.'
         ,
          featureName: 'angular'
          featureState: 'core.sub.page.angular'
          featureDescription: 'Angular I use primarily because it lets me build big things without worrying too much about Javascript getting in the way. Now I just get to worry about Angular getting in the way instead. Will need to be updated once Angular 2.0 comes out, but who knows how long that will take.'
        ]

