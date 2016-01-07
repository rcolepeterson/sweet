/*global ApplicationConfiguration:false */
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName,
    ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName)
    .run(function($rootScope) {
        //note overlay has not been shown. this will be marked true when it does get shown.
        $rootScope.hasShownIntroOverlay = false;
        //seo.
        // $rootScope.$on('$stateChangeStart', function(event, currentRoute, previousRoute) {
        //     document.title = currentRoute.seoPageTitle;
        // });
    })
    .factory('httpInterceptor', function($q, $rootScope) {
        //global http loader. used for ajax calls. you could put global error handling here. or bind stuff to httpLoadingStatus.
        var numLoadings = 0;
        return {
            request: function(config) {
                $rootScope.httpLoadingStatus = 'Loading ...';
                numLoadings++;
                return config || $q.when(config);
            },
            response: function(response) {
                if ((--numLoadings) === 0) {
                    $rootScope.httpLoadingStatus = 'Loaded';
                }
                return response || $q.when(response);
            },
            responseError: function(response) {
                if (!(--numLoadings)) {
                    $rootScope.httpLoadingStatus = 'Error.';
                    console.warn('we got an error: ' + response.status, response.statusText, response.data);
                }
                return $q.reject(response);
            }
        };
    }).config(function($httpProvider, $locationProvider) {
        //support global loader
        $httpProvider.interceptors.push('httpInterceptor');
        $locationProvider.html5Mode(true).hashPrefix('!');
    });

//Then define the init function for starting up the application
angular.element(document).ready(function() {
    //Fixing facebook bug with redirect
    if (window.location.hash === '#_=_') {
        window.location.hash = '#!';
    }

    //Then init the app
    angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
