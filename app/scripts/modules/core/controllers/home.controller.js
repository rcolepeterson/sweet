/*global io:false */
'use strict';
angular.module('core').controller('HomeController', ['$scope','$rootScope','$timeout','dialogueService',
  function($scope, $rootScope, $timeout, dialogueService) {

    //Name space the scope.
    $scope.homeModel = {}

    //Stick config settings on the scope so the ui binding can use. @todo - better way? convert to service?
    $scope.configSettings = ApplicationConfiguration.configSettings;

    if ( $rootScope.hasShownIntroOverlay === false )
    {
    	$timeout(function(){
    		dialogueService.displayTemplate('scripts/modules/core/tpl/show.html');
    	
    	}, 1000)
    	$rootScope.hasShownIntroOverlay = true;
	}
  }

]);
