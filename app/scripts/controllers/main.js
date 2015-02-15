'use strict';

/**
 * @ngdoc function
 * @name applicationApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the applicationApp
 */
var app = angular.module('applicationApp');

app.controller('MainCtrl', ['$scope', '$http', '$location', function ($scope, $http) {
	$scope.location = 'Minsk';
  	$scope.sendRequest = function() {
	  	var query = $scope.query;
	  	var location = $scope.location;
	    var url = 'https://api.foursquare.com/v2/venues/explore?client_id=MAUZCKCGCZGLF5PIOT4H4ZNE4AIHVZX0WJTZCOKFDBNN3GIU&client_secret=XTC4XEGG13NS503GUJAZNGWB5X2NH1HAFYA2GZLPCEONI2WT&v=20130815&near='+location+'&venuePhotos=1&query='+query+'';

	    $http({method:'GET', url: url}).
	    	success(function(data) {
	    		$scope.venues = data.response.groups[0].items;
	    		$scope.venues.forEach(getUrlForImage);
	    	}).
			error(function() {
	    		console.log('fail :(');
	    	});
	};

    	var getUrlForImage = function(value, index) {
    		if (value.venue.photos.groups.length !== 0) {
	    		var imageUrl = value.venue.photos.groups[0].items[0].prefix+'280x250'+value.venue.photos.groups[0].items[0].suffix;
	    		$scope.venues[index].imageUrl = imageUrl;
	    	}
	    	else {
	    		$scope.venues[index].imageUrl = 'http://www.mlmnewspaper.com/wp-content/themes/weekly/timthumb.php?src=http://www.mlmnewspaper.com/wp-content/themes/weekly/images/default_thumb.gif&h=250&w=280&zc=1';
	    	} 	
    	};
}]);


app.filter('ratingFilter', function() {
	return function(rating) {
		if (rating !== undefined) {
			return 'Rating: '+rating;
		}
		else {
			return 'Not rated yet';
		}
	};
});

app.filter('addressFilter', function() {
	return function(address) {
		if (address !== undefined) {
			return 'Address: '+address;
		}
		else {
			return ' ';
		}
	};
});
