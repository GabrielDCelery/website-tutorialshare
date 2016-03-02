var LogFactory = angular.module('LogFactory', []);

LogFactory.factory('Log', ['$http', function($http){

	function list(callback){
		$http.get('/log/list').then(function (response){
			callback(response);
		})
	}

	return {
		list: list
	}

}])