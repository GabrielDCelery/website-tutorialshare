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

	$scope.listOrder = 'title';
	$scope.reverseList = false;

	function orderList(string){
		$scope.listOrder = string;
		$scope.reverseList = !$scope.reverseList;
	}

	Database.listLogs(function (response){
		console.log(response.data.data)
		$scope.logs = response.data.data;
	})

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/
	
	$scope.orderList = orderList;


}])