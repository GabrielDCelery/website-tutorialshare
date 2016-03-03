var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;
var schema = globalRequire('config/db').schema;

var token = {

	verify: function (req, res, next){

		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		/*var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];*/
		jwt.verify(token, secretPassword, function (err, decoded){
			if(err) {

				res.json({
					success: false, 
					message: 'Failed to authenticate token!'
				})	

			} else {

				var username = mysql.escape(decoded[schema.user.name]);
				var email = mysql.escape(decoded[schema.user.email]);
				var password = decoded.password;
				var querystring = 'SELECT ' + schema.user.id + ', ' + schema.user.password + ' FROM ' + schema.user.tablename + ' WHERE ' + schema.user.name + ' = ' + username + ' AND ' + schema.user.email + ' = ' + email;
				
				connection.query(querystring, function (err, rows) {
					if (err){
						res.json({
							success: false,
							message: 'There was an error while connecting to the database!'
						});
					} else if (rows.length == 0){
						res.json({
							success: false, 
							message: 'User not found!'
						});
					} else if (rows[0].password != password){
						res.json({
							success: false,
							message: 'Wrong password!'
						});
					} else {
						req.body.userId = decoded.id;
						next();
					}
				});
			}

		})

	}

}

module.exports = token;