var ListController = angular.module('ListController', []);

ListController.controller('ListCtrl', [
	'$scope', 
	'Database', 
	function(
		$scope, 
		Database
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.logs = [];

	Database.listLogs(function (response){
		console.log(response.data.data)
		$scope.logs = response.data.data;
	})

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

}])