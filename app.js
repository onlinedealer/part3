
   var FirstApp = angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

   (function() {
       'use strict';
       FirstApp.config(['$routeProvider', 'uiRouters', myConfigFn]);

       function myConfigFn($routeProvider, uiRouters) {

           

           $routeProvider.
           when(uiRouters.home, {
               templateUrl: uiRouters.directivesHtmlPath + '/home.html',
               controller: 'homeCtrl'
           }).
           when(uiRouters.dashboard, {
               templateUrl: uiRouters.directivesHtmlPath + '/dashboard.html',
          controller: 'dashboardCtrl'
           }).
           otherwise({
               redirectTo: uiRouters.home
           });
       }
       
   })();
