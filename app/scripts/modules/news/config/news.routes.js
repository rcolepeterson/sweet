'use strict';

// Setting up route
angular.module('news').config(['$stateProvider',
  function($stateProvider) {

    // State routing
    $stateProvider.
    state('news', {
      url: '/news',
      templateUrl: 'scripts/modules/news/views/news.view.html',
      seoPageTitle:'Sweet Water Band News Page'
    })

  }
]);
