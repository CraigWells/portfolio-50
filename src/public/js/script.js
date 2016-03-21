(function(angular) {
  'use strict';
var app = angular.module('portfolioApp', ['ngRoute']);

app.service('projectsService', function(){
      return [
          {
              name : "Project 1",
              id : "project1"
          },
          {
              name : "Project 2",
              id : "project2"
          },           
          {
              name : "Project 3",
              id : "project3"
          },          
          {
              name : "Project 4",
              id : "project4"
          }
      ];
 });

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .when('/projects/:id', {
          templateUrl: 'views/project.html',
          controller: 'ProjectCtrl',
          controllerAs: 'project'
        })
        .when('/demo/:id', {
          templateUrl: 'views/demo.html',
          controller: 'DemoCtrl',
          controllerAs: 'demo'
        })
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home'
        });
      $locationProvider.html5Mode(true);
  }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location',
    function($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
  }])
  .controller('AboutCtrl', ['$routeParams', function($routeParams) {
    this.name = "AboutCtrl";
    this.params = $routeParams;
  }])
  .controller('ProjectCtrl', ['$routeParams', function($routeParams) {
    this.name = "ProjectCtrl";
    this.id = $routeParams.id;
  }])
  .controller('DemoCtrl', ['$routeParams', function($routeParams) {
    this.name = "DemoCtrl";
    this.id = $routeParams.id;
  }])
  .controller('HomeCtrl', ['$routeParams', 'projectsService', function($routeParams, projectsService) {
    this.name = "HomeCtrl";
    this.params = $routeParams;
    this.projects = projectsService;
  }])
  .directive('header', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/header.html'
    }
  }).directive('footer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/footer.html'
    }
  }).directive('content', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/content.html'
    }
 });

})(window.angular);