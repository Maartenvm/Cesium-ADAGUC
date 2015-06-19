(function() {
  'use strict';

  function CesiumViewerController($scope, $http, Cesium, CesiumViewerService) {

    this.init = function(element) {
      CesiumViewerService.init(element);
      CesiumViewerService.timelineWidget.addEventListener('settime', this.onTimelineScrub, false);
      CesiumViewerService.clock.onTick.addEventListener(this.onTimelineTick);

      this.addMapLayer();
    };

    //Add eventlisteners for the timeline
    this.onTimelineScrub = function(e) {
      CesiumViewerService.clock.currentTime = e.timeJulian;
      CesiumViewerService.clock.shouldAnimate = false;

      this.timeSelection = Cesium.JulianDate.toDate(CesiumViewerService.clock.currentTime);
    }.bind(this);

    this.onTimelineTick = function() {
      this.timeSelection = Cesium.JulianDate.toDate(CesiumViewerService.clock.currentTime);
    }.bind(this);

    this.addMapLayer = function() {
      this.mapLayer = CesiumViewerService.viewer.scene.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
        url: '//dev.virtualearth.net',
        key: 'AsP2TER1bj7tMZGuQtDkvWtX9vOezdG3zbeJp3tOv8d1Q4XrDLd6bEMz_nFsmcKi',
        mapStyle: Cesium.BingMapsStyle.AERIAL
      }));
      this.radarLayer = CesiumViewerService.viewer.scene.imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          url: '//geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
            layers : 'RADNL_OPER_R___25PCPRR_L3_COLOR',
            parameters : {
              service: 'WMS',
              version: '1.3.0',
              //request: 'GetMap',
              //crs: 'EPSG:4326',
              styles: 'default',
              format: 'image/png',
              transparent : 'true'
            }
      }));
      this.radarLayer = CesiumViewerService.viewer.scene.imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          url: '//localhost/cgi-bin/btd.cgi?',
            layers : 'btd300crosshair,warningindicator',
            parameters : {
              //service: 'WMS',
              //version: '1.1.1',
              //request: 'GetMap',
              //srs: 'EPSG:3857',
              styles: 'default',
              format: 'image/png',
              transparent : 'true'
            }
      }));

      this.meteoLayer = CesiumViewerService.viewer.scene.imageryLayers.addImageryProvider(
        new Cesium.WebMapServiceImageryProvider({
          url: '//localhost/cgi-bin/demo.cgi?',
            layers : 'METEOSAT_10_SEVIRI_EUROPEHVIS/METEOSAT_10_SEVIRI_EUROPEHVIS',
            parameters : {
              //service: 'WMS',
              //version: '1.1.1',
              //request: 'GetMap',
              //srs: 'EPSG:3857',
              styles: 'default',
              format: 'image/png',
              transparent : 'true',
              //time: this.timeSelection
              time:'2015-06-05T15:45:00Z'
            }
      }));
    };

    this.removeMapLayer = function() {
      CesiumViewerService.viewer.scene.imageryLayers.remove(this.mapLayer, true);
    };
  }

  angular.module('adagucApp.cesiumViewer').controller('CesiumViewerController', CesiumViewerController);
})();
