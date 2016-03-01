var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;
var schema = globalRequire('config/db').schema;

var auth = {

	doesUserExist: function (req, res){

		var username = mysql.escape(req.body.username);
		var email = mysql.escape(req.body.email);
		var querystring = 'SELECT ' + schema.user.name + ', ' + schema.user.email + ' FROM ' + schema.user.tablename + ' WHERE ' + schema.user.name + ' = ' + username + ' OR ' + schema.user.email + ' = ' + email;

		connection.query(querystring, function(err, rows){
			if (err){
				res.json({
					success: false,
					message: 'There was an error while connecting to the database!'
				});
			} else if (rows.length > 0){
				for(var i = 0; i < rows.length; i++){
					if(rows[i].username == req.body.username){
						res.json({
							success: false,
							message: 'Username already exists!'
						});
						break;
					}

					if(rows[i].email == req.body.email){
						res.json({
							success: false,
							message: 'Email already exists!'
						});
						break;
					}
				}
			} else {
				res.json({
					success: true,
					message: 'Username and email are free!'
				});	
			}
		})

	},

	login: function (req, res){

		var username = mysql.escape(req.body.username);
		var password = md5(req.body.password);
		var querystring = 'SELECT * FROM ' + schema.user.tablename + ' WHERE ' + schema.user.name + ' = ' + username;

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

				var token = jwt.sign(rows[0], secretPassword, {expiresIn: 86400});

				res.json({
					success: true,
					message: 'Login successful!',
					token: token
				});
			}
		});
	},

	register: function (req, res){

		var username = mysql.escape(req.body.username);
		var password = mysql.escape(md5(req.body.password));
		var email = mysql.escape(req.body.email);
		var querystring = 'INSERT INTO ' + schema.user.tablename + ' (' + schema.user.name + ', ' + schema.user.password + ', ' + schema.user.email + ') VALUES (' + username + ', ' + password + ', ' + email + ')';

		connection.query(querystring, function (err, result) {
			if (err){
				res.json({
					success: false,
					message: 'There was an error while connecting to the database!'
				});	
			} else if (result.affectedRows == 1){
				res.json({
					success: true,
					message: 'Registration successful!'
				});
			} else {
				res.json({
					success: false,
					message: 'Registration unsuccessful!'
				});
			}
		});
	},

	resetMail: function (req, res){

		var email = mysql.escape(req.body.email);
		var querystring = 'SELECT ' + schema.user.name + ', ' + schema.user.email + ' FROM ' + schema.user.tablename + ' WHERE ' + schema.user.email + ' = ' + email;

		connection.query(querystring, function (err, rows){
			if (err) {
				res.json({
					success: false,
					message: 'There was an error while connecting to the database!'
				})
			} else if (rows.length == 1){

				rows[0].timestamp = Date.parse(new Date());
				var jsonString = JSON.stringify(rows[0]);

				var cipher = crypto.createCipher('aes192', secretPassword);
				var encrypted = cipher.update(jsonString, 'utf8', 'hex');
				encrypted += cipher.final('hex');

				console.log(encrypted); // here goes the email handler sending the encrypted code in email

				res.json({
					success: true,
					message: 'An email has been sent with the instructions to reset your password!'
				});

			} else {
				res.json({
					success: false,
					message: 'The provided email address could not be found in the database!'
				});
			}
		})
	},

	reset: function (req, res){

		var encrypted = req.body.encrypteduserdata;
		var decipher = crypto.createDecipher('aes192', secretPassword);
		var decrypted = decipher.update(encrypted, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		decrypted = JSON.parse(decrypted);

		if((Date.parse(new Date()) - decrypted.timestamp) < 1800000){

			var username = mysql.escape(decrypted.username);
			var email = mysql.escape(decrypted.email);
			var password = mysql.escape(md5(req.body.newpassword));
			var querystring = 'UPDATE ' + schema.user.tablename + ' SET ' + schema.user.password + ' = ' + password + ' WHERE ' + schema.user.name + ' = ' + username + ' AND ' + schema.user.email + ' = ' + email;

			connection.query(querystring, function (err, result) {
				if (err) {
					res.json({
						success: false,
						message: 'There was an error while connecting to the database!'
					})
				} else if (result.affectedRows == 1){
					res.json({
						success: true,
						message: 'Password changed!'
					});
				} else {
					res.json({
						success: false,
						message: 'Could not change password!'
					});
				}
			});

		} else {
			res.json({
				success: false,
				message: 'Request expired!'
			})
		}

	}

}

module.exports = auth;