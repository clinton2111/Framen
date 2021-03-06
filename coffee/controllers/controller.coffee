angular.module 'framen'
.controller 'mainController', ['$scope', 'mainServices', '$q', '$window', ($scope, mainServices, $q, $window)->
  q = null
  $scope.$on('$viewContentLoaded', ()->
    $ ".button-collapse"
    .sideNav();
    $ '.parallax'
    .parallax();
    $('.slider').slider({full_width: true, height: 800});
    $("loading").hide();
    q = $q.defer()
    loadScript();
    q.promise
  );
  $window.initMap = ->
    center = new google.maps.LatLng(15.3912425, 73.8330925)
    mapOptions =
      zoom: 16
      scrollwheel: false
      draggable: false
      center: center
      mapTypeId: google.maps.MapTypeId.ROADMAP
      styles: [
        {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "color": "#e0efef"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "hue": "#1900ff"
            },
            {
              "color": "#c0e8e8"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "lightness": 100
            },
            {
              "visibility": "simplified"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            },
            {
              "lightness": 700
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "color": "#7dcdcd"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#009688"
            }
          ]
        }
      ]

    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    infowindow = new google.maps.InfoWindow();


    img =
      url: '../assets/pointer.svg'
      origin: new google.maps.Point(0, 0)

    marker = new google.maps.Marker
      map: $scope.map,
      position: center,
      icon: img

    google.maps.event.addListener marker, 'mouseover', ()->
      infowindow.setContent('Framen Shipping Limited');
      infowindow.open($scope.map, this);
      marker.setMap($scope.map)


    google.maps.event.addListener marker, 'mouseout', ()->
    infowindow.close()
    q.resolve

  loadScript = ->
    script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap';
    document.body.appendChild(script);


  $scope.sendEmail = ()->
    mainServices.sendEmail($scope.email)
    .then (data)->
      response = data.data;
      if response.status is 'Success' then Materialize.toast(response.status + ' - ' + response.message, 4000)
      else
        Materialize.toast(response.status + ' - ' + response.message, 4000)
    , (error)->
      Materialize.toast('Opps something went wrong.', 4000)
]