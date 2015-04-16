#require('./featurename/feature') for each Feature of the App

Features =
  feature: require('./feature/feature')
  featureTwo: require('./featureTwo/feature')

module.exports = Features
