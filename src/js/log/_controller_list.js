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

	Database.listLogs(function (response){
		console.log(response.data.data)
	})

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/

}])