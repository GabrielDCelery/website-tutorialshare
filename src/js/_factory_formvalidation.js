var FormValidationFactory = angular.module('FormValidationFactory', []);

FormValidationFactory.factory('FormValidation', [function(){

	function isEmailValid(input){

		var pattern = new RegExp(/^\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/);

		if(pattern.test(input)){
			return true;
		} else {
			return false;
		}
	}

	function isTagValid(input){

		var pattern = new RegExp(/^[a-zA-Z0-9]*$/);

		if(pattern.test(input)){
			return true;
		} else {
			return false;
		}
	}

	function isUrlValid(input){

		var pattern = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);

		if(pattern.test(input)){
			return true;
		} else {
			return false;
		}
	}

	function isInputLongEnough(input, length){
		if(length <= input.length){
			return true;
		} else {
			return false;
		}
	}

	function isInputTooLong(input, length){
		if(length < input.length){
			return true;
		} else {
			return false;
		}	
	}

	function areInputsMatching(inputOne, inputTwo){
		if(inputOne == inputTwo){
			return true;
		} else {
			return false;
		}
	}

	function duplicateData(input, array){
		for(var i = 0; i < array.length; i++){
			if(input == array[i]){
				return true;
			}
		}	
		return false;
	}

	function isArrayEmpty(array){
		if(array.length == 0){
			return true;
		} else {
			return false;
		}
	}

	function canSendData(alertObject){

		var canSend = true;

		for(var property in alertObject){
			if(alertObject[property] == true) canSend = false;
		}

		if(canSend) return true;

	}

	function addBackSlashToUrl(url){
		if(url.charAt(url.length - 1) != '/'){
			return url + '/';
		} else {
			return url;
		}
	}

	return {
		isEmailValid: isEmailValid,
		isTagValid: isTagValid, 
		isUrlValid: isUrlValid,
		isInputLongEnough: isInputLongEnough,
		isInputTooLong: isInputTooLong, 
		areInputsMatching: areInputsMatching,
		duplicateData: duplicateData, 
		isArrayEmpty: isArrayEmpty, 
		canSendData: canSendData,
		addBackSlashToUrl: addBackSlashToUrl
	}

}])