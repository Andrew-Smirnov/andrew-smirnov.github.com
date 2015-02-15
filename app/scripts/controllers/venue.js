'use strict';

var app = angular.module('applicationApp');

app.controller('VenueCtrl', ['$scope', '$http','$location', '$routeParams', function ($scope, $http, $location, $routeParams) {
	var venueId = $routeParams.venueId;
	var url = 'https://api.foursquare.com/v2/venues/'+venueId+'?client_id=MAUZCKCGCZGLF5PIOT4H4ZNE4AIHVZX0WJTZCOKFDBNN3GIU&client_secret=XTC4XEGG13NS503GUJAZNGWB5X2NH1HAFYA2GZLPCEONI2WT&v=20130815';
	var imagesMas = [];
	var workingHours = [];
	var myMap;
	$http({method:'GET', url: url}).
		success(function(data) {
			console.log(data);
			$scope.lat = data.response.venue.location.lat;
			$scope.lng = data.response.venue.location.lng;
			$scope.name = data.response.venue.name;
			$scope.description = data.response.venue.description;
			$scope.fullAddress = getAddress(data);

			if (data.response.venue.photos.count !== 0) {
				data.response.venue.photos.groups[0].items.forEach(getUrlForImages);
				$scope.firstImage = imagesMas[0];
				imagesMas.splice(0, 1);
				$scope.imagesMas = imagesMas;	
				$scope.hasPhotos = true;
			}
			else {
				$scope.hasPhotos = false;
			}

			if (data.response.venue.hours !== undefined){
				data.response.venue.hours.timeframes.forEach(getHours);
				$scope.workingHours = workingHours;
				$scope.hasWorkingHours = true;
			}
			else {
				$scope.hasWorkingHours = false;
			}

			if (data.response.venue.contact.formattedPhone !== undefined) {
				$scope.hasPhone = true;
				$scope.phone = data.response.venue.contact.formattedPhone;
			}
			else {
				$scope.hasPhone = false;
			}

			if (data.response.venue.url !== undefined) {
				$scope.hasUrl = true;
				$scope.website = data.response.venue.url;
			}
			else {
				$scope.hasUrl = false;
			}
		}).
		error(function() {
			console.log('fail two');
		});


	var getUrlForImages = function(value) {
		var imageUrl = value.prefix+'600x320'+value.suffix;
		imagesMas.push(imageUrl);
	};

	var getAddress = function(data) {
		var fullAddress = [];
		fullAddress = data.response.venue.location.formattedAddress;
		fullAddress = fullAddress.join(', ');
		return fullAddress;
	};

	var getHours = function(value) {
		workingHours.push(value.days+': '+value.open[0].renderedTime);
	};

	$scope.showMap = function() {
		var lat = $scope.lat;
		var lng = $scope.lng;
		/*
		var myLatlng = new google.maps.LatLng(lat, lng);
		var mapOptions = {
          center: myLatlng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

        var marker = new google.maps.Marker({
	      position: myLatlng,
	      map: map
  		});*/
		
		if (!myMap) {
            myMap = new ymaps.Map('map_canvas', {
                center: [lat, lng], 
                zoom: 17
            });
            var myGeoObject = new ymaps.GeoObject({
	            geometry: {
	                type: 'Point',
	                coordinates: [lat, lng]
	            },            
        	},
        	{
            	iconcolor: '#0095b6'
        	});
    		myMap.geoObjects.add(myGeoObject);
        }
        else {
            myMap.destroy();
            myMap = null;
        }
	};
}]);