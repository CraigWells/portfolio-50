(function(angular) {
  'use strict';
var app = angular.module('portfolioApp', ['ngRoute']);

app.service('projectsService', function(){
      return [
          {
              name : "Graph Data",
              id : "graph-data",
              img: "sm_graph.jpg",
              config: {
                name : "graph_data",
                directive : {
                    graph : true
                }
              }
          },
          {
              name : "Real Time Graphs",
              id : "real-time-graphs",
              img: "placeholder.png"
          },           
          {
              name : "Canvas Draw",
              id : "canvas-draw",
              img: "pencil.png"
          },          
          {
              name : "Responsive Graphs",
              id : "responsive-graphs",
              img: "bar_graph.jpg"
          },         
          {
              name : "Responsive Radial",
              id : "responsive-radial",
              img: "radial.jpg"
          },          
          {
              name : "Products Catalogue",
              id : "products-catalogue",
              img: "placeholder.png"
          },          
          {
              name : "Skills Chart",
              id : "skills-chart",
              img: "placeholder.png"
          },          
          {
              name : "Project 8",
              id : "project8",
              img: "placeholder.png"
          },          
          {
              name : "Project 9",
              id : "project9",
              img: "placeholder.png"
          },          
          {
              name : "Project 10",
              id : "project10",
              img: "placeholder.png"
          }
      ];
 });

app.factory('graphData', function(){
        // Perform the data manipulation 
        var height = 80,
            width = 170;

        function init(){
            var len = data.length;    
            for(var i = 0; i < len; i++){
                calculateValues(data[i], calculateDifs);
                data[i].height = height;
                data[i].width = width;
            } 
            return data;
        };       

        function calculateValues(item, callback){
            var values = [];
            for(var key in item.columnValues){
                values.push(item.columnValues[key]);
            }
            item.values = values;
            callback(item, plotPoints);
        };

        function calculateDifs(item, callback){
            item.pointsY = [];
            var len = item.values.length,
                lowest = getLowestValue(item.values),
                range = getHeighestValue(item.values) - lowest,
                increment = height / range; 
            for(var i=0; i<len;i++){
                item.pointsY.push(height - (item.values[i] - lowest) * increment);
            }
            callback(item);
        };

        function plotPoints(item){
            var range = item.pointsY.length - 1,
                spacesX = Math.floor(width / range),
                count = 0;
            item.pointsX = [];
            item.pointsX.push(count);
            for(var i = 0; i < range; i++){
                count += spacesX;
                item.pointsX.push(count);
            }
        };

        function getHeighestValue(values){
            return Math.max.apply(null, values);
        };

        function getLowestValue(values){
            return Math.min.apply(null, values);
        };

        return init();
    });


 app.factory('graphRenderer', function(){

        function drawGraph(item){

            var settings = {
                "a" : 0,
                "b" : item.height/2,
                "c" : item.width,
                "d" : item.height/2,
                "colour" : "#909090"
            }; 

            var drawingCanvas = document.getElementById(item.name);
            var context = drawingCanvas.getContext("2d");
            // draw median
            context.beginPath();
            context.moveTo(settings.a, settings.b);
            context.lineTo(settings.c, settings.d);
            context.strokeStyle = settings.colour;
            context.stroke();
            // draw graph line
            var len = item.pointsX.length;
            context.beginPath();
            for(var i = 0; i < len; i++){
                context.lineTo(item.pointsX[i], item.pointsY[i]);
            }
            context.strokeStyle="red";
            context.stroke();            
        };

        function plotLine(){
            var len = canvasItem.data.pointsX.length;
            canvasItem.beginPath();
            for(var i = 0; i < len; i++){
                canvasItem.lineTo(canvasItem.data.pointsX[i], canvasItem.data.pointsY[i]);
            }
            canvasItem.strokeStyle="red";
            canvasItem.stroke();
        };

        return function(graphData){

            angular.forEach(graphData, function(item) {
                drawGraph(item);
            });

        };
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
  .controller('DemoCtrl', ['$routeParams', '$filter', 'projectsService', function($routeParams, $filter, projectsService) {
    this.name = "DemoCtrl";
    this.id = $routeParams.id;
    this.project = projectConfigLookup(projectsService, this.id);

    function projectConfigLookup(projectsService, id) {
       var found = $filter('filter')(projectsService, {id: id}, true), selected;
       if (found.length) {
           selected = found[0];
       } else {
           selected = 'Not found';
       }
       return selected;
    }

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
 }).directive('backImg', function(){
      return function(scope, element, attrs){
          attrs.$observe('backImg', function(value) {
              element.css({
                  'background-image': 'url(img/' + value +')',
                  'background-size' : '140px 140px',
                  'background-repeat' : 'no-repeat'
              });
          });
      };
  }).directive('demo', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/content.html'
    }
 }).directive('graphs', ['graphData', '$timeout', 'graphRenderer', function(graphData, $timeout, graphRenderer) {
        return {
            restrict: 'E',
            templateUrl: 'views/graph.html',
            link: function(scope, element) {
                scope.graphs = graphData;
                $timeout(function () {
                    graphRenderer(graphData); 
                });
            }
        }
}]);

})(window.angular);