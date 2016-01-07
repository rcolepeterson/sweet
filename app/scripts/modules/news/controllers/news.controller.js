/*global io:false */
'use strict';
angular.module('news').controller('NewsController', ['$scope',
  function($scope) {
      $scope.newsModel = {};
      $scope.newsModel.pagetitle = 'subscribe';
  }

]);
