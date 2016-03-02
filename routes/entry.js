var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;
var schema = globalRequire('config/db').schema;

var entry = {

	list: function (req, res){

			res.json({
				success: true,
				data: 'data sent'
			});


	}

}

module.exports = entry;