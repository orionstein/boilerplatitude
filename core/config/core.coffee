Features = require('../../features/features')

Dependencies = ['ui.router']

Dependencies = Dependencies.concat Object.keys Features

console.log(Dependencies)

App = angular
  .module 'coreApp', Dependencies

require('./config')
