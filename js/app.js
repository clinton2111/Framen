angular.module('framen', ['ui.router', 'duScroll']).config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'partials/main.html',
      controller: 'mainController'
    });
    return $urlRouterProvider.otherwise('/home');
  }
]).constant('API', {
  url: '../api/source/'
});
