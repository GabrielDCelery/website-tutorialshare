var ListController = angular.module('ListController', []);

ListController.controller('ListCtrl', [
	'$scope', 
	'Log', 
	function(
		$scope, 
		Log
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	Log.list(function (response){
		console.log(response.data.data)

	})

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

}])