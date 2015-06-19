(function() {
  'use strict';

  //Tying it all together
  angular.module('adagucApp', [
    'ui.bootstrap',

    //Modules dependent on cesium
    'adagucApp.cesiumViewer'
  ]);

  //Utility modules
  angular.module('adagucApp.templates', []);

  //Modules dependent on cesium
  angular.module('cesium', [])
    .factory('Cesium', function($window) {
      return $window.Cesium;
    });
  angular.module('adagucApp.cesiumViewer', ['cesium']);
})();
