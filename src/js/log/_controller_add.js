var AddLogController = angular.module('AddLogController', []);

AddLogController.controller('AddLogCtrl', [
	'$scope', 
	'Database', 
	'FormValidation', 
	function(
		$scope, 
		Database,
		FormValidation
	){

/*******************************************************************************
VARIABLES
*******************************************************************************/

	$scope.data = {
		form: {
			title: '',
			url: '',
			description: '',
			addtag: '',
			tags: []
		},
		success: {
			message: ''
		},
		error: {
			message: ''
		}
	}

	$scope.display = {
		page: {
			form: true,
			success: false,
			error: false
		},
		alert: {
			titletooshort: false,
			titletoolong: false,
			descriptiontooshort: false,
			descriptiontoolong: false,
			urlnotvalid: false,
			tagtooshort: false,
			tagtoolong: false,
			invalidtagformat: false,
			needtags: false,
			duplicatetag: false
		}
	}

/*******************************************************************************
FUNCTIONS
*******************************************************************************/

	function resetTagAlerts(){
		$scope.display.alert.invalidtagformat = false;
		$scope.display.alert.tagtooshort = false;
		$scope.display.alert.duplicatetag = false;
		$scope.display.alert.tagtoolong = false;	
	}

	function addTag(input, array){

		resetTagAlerts();

		var tagNotValid = $scope.display.alert.invalidtagformat = !FormValidation.isTagValid(input);
		var tagTooShort = $scope.display.alert.tagtooshort = !FormValidation.isInputLongEnough(input, 3);
		var duplicateTag = $scope.display.alert.duplicatetag = FormValidation.duplicateData(input, array);
		var tagTooLong = $scope.display.alert.tagtoolong = FormValidation.isInputTooLong(input, 15);

		if(!(tagNotValid || tagTooShort || duplicateTag || tagTooLong)){
			array.push(input.toLowerCase());
		}

	}

	function removeTag(array){
		array.pop();
	}

	function addLog(input){

		resetTagAlerts();

		$scope.display.alert.titletooshort = !FormValidation.isInputLongEnough(input.title, 8);
		$scope.display.alert.titletoolong = FormValidation.isInputTooLong(input.title, 25);

		var url = FormValidation.addBackSlashToUrl(input.url.trim());

		$scope.display.alert.urlnotvalid = !FormValidation.isUrlValid(url);
		$scope.display.alert.descriptiontooshort = !FormValidation.isInputLongEnough(input.description, 10);
		$scope.display.alert.descriptiontoolong = FormValidation.isInputTooLong(input.description, 140);
		$scope.display.alert.needtags = FormValidation.isArrayEmpty(input.tags);

		if(FormValidation.canSendData($scope.display.alert)){
			Database.addLog(input, function (response){
				console.log(response);
			})
		}
	}

/*******************************************************************************
BINDING FUNCTIONS
*******************************************************************************/
	
	$scope.addTag = addTag;
	$scope.addLog = addLog;
	$scope.removeTag = removeTag;
	

}])