var ListController = angular.module('ListController', []);

ListController.controller('ListCtrl', [
	'$scope', 
	'$location', 
	'Database', 
	function(
		$scope, 
		$location, 
		Database
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.data = {
		error: {
			message: ''
		}
	}

	$scope.display = {
		page: {
			error: false
		}
	}

	$scope.logs = [];

	$scope.listOrder = 'title';
	$scope.reverseList = false;

	$scope.checklist = {
		logs: []
	}

/*******************************************************************************
FUNCTIONS
*******************************************************************************/

	function orderList(string){
		$scope.listOrder = string;
		$scope.reverseList = !$scope.reverseList;
	}

	function deleteLogs(logs){
		Database.deleteLogs(logs, function (response){
			if(response.data.success){
				$scope.display.page.error = false;
				listLogs();
			} else {
				$scope.data.error.message = response.data.message;
				$scope.display.page.error = true;
			}
		})
	}

	function listLogs(){
		Database.listLogs(function (response){
			$scope.logs = response.data.data;
		})	
	}

/*******************************************************************************
INITIATE FUNCTION UPON LOADING
*******************************************************************************/

	listLogs();

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/
	
	$scope.orderList = orderList;
	$scope.deleteLogs = deleteLogs;


}])