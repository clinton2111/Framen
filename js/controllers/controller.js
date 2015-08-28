angular.module('framen').controller('mainController', [
  '$scope', 'mainServices', '$q', '$window', function($scope, mainServices, $q, $window) {
    var loadScript, q;
    q = null;
    $scope.$on('$viewContentLoaded', function() {
      $(".button-collapse").sideNav();
      $('.parallax').parallax();
      $('.slider').slider({
        full_width: true,
        height: 800
      });
      $("loading").hide();
      q = $q.defer();
      loadScript();
      return q.promise;
    });
    $window.initMap = function() {
      var center, img, infowindow, mapOptions, marker;
      center = new google.maps.LatLng(15.3912425, 73.8330925);
      mapOptions = {
        zoom: 16,
        scrollwheel: false,
        draggable: false,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }, {
                "color": "#e0efef"
              }
            ]
          }, {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "visibility": "on"
              }, {
                "hue": "#1900ff"
              }, {
                "color": "#c0e8e8"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "lightness": 100
              }, {
                "visibility": "simplified"
              }
            ]
          }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "visibility": "on"
              }, {
                "lightness": 700
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#7dcdcd"
              }
            ]
          }, {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#009688"
              }
            ]
          }
        ]
      };
      $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      infowindow = new google.maps.InfoWindow();
      img = {
        url: '../assets/pointer.svg',
        origin: new google.maps.Point(0, 0)
      };
      marker = new google.maps.Marker({
        map: $scope.map,
        position: center,
        icon: img
      });
      google.maps.event.addListener(marker, 'mouseover', function() {
        infowindow.setContent('Framen Shipping Limited');
        infowindow.open($scope.map, this);
        return marker.setMap($scope.map);
      });
      google.maps.event.addListener(marker, 'mouseout', function() {});
      infowindow.close();
      return q.resolve;
    };
    loadScript = function() {
      var script;
      script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
      return document.body.appendChild(script);
    };
    return $scope.sendEmail = function() {
      return mainServices.sendEmail($scope.email).then(function(data) {
        var response;
        response = data.data;
        if (response.status === 'Success') {
          return Materialize.toast(response.status + ' - ' + response.message, 4000);
        } else {
          return Materialize.toast(response.status + ' - ' + response.message, 4000);
        }
      }, function(error) {
        return Materialize.toast('Opps something went wrong.', 4000);
      });
    };
  }
]);
