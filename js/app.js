angular.module('framen', ['ui.router']).config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: 'partials/main.html',
      controller: 'mainController'
    });
    return $urlRouterProvider.otherwise('/home');
  }
]);
