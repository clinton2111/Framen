angular.module 'framen',['ui.router','duScroll']
.config ['$stateProvider', '$urlRouterProvider',($stateProvider,$urlRouterProvider)->
  $stateProvider.state 'home',
    url:'/home'
    templateUrl:'partials/main.html'
    controller:'mainController'
  $urlRouterProvider.otherwise '/home'
]
.constant 'API',
  url: '../api/source/'