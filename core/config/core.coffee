Features = require('../../features/features')

Dependencies = ['ui.router']

Dependencies = Dependencies.concat Object.keys Features

App = angular
  .module 'coreApp', Dependencies

require('./config')
