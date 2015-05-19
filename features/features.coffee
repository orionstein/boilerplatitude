#require('./featurename/feature') for each Feature of the App

Features =
  shared: require('./shared/feature')
  main: require('./main/feature')
  static: require('./static/feature')
  angular: require('./angular/feature')
  scss: require('./scss/feature')
  coffee: require('./coffee/feature')

module.exports = Features
