var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;
var schema = globalRequire('config/db').schema;

var log = {

	add: function (req, res){

		var userId = req.body.userId;
		var title = mysql.escape(req.body.title);
		var description = mysql.escape(req.body.description);
		var url = mysql.escape(req.body.url);
		var urlHashKey = mysql.escape(req.body.urlHashKey);
		/* Demo version only adds one tag */
		var tag = mysql.escape(req.body.tags[0]);
		var tagHashKey = mysql.escape(req.body.tagsHashKeys[0]);

		var querystring = 'CALL addUrl(' + urlHashKey + ', ' + url + ', @urlId); SELECT @urlId AS urlId;';
		
		connection.query(querystring, function (err, result){
			if (err) {
				res.json({
					success: false,
					message: 'There was an error while connecting to the database!'
				});
			} else {
				var urlId = result[1][0]['urlId'];
				var querystring = 'CALL addTags(' + tagHashKey + ', ' + tag + ', @tagId); SELECT @tagId AS tagId;';
				
				connection.query(querystring, function (err, result){
					if (err) {
						res.json({
							success: false,
							message: 'There was an error while connecting to the database!'
						});
					} else {
						var tagId = result[1][0]['tagId'];
						var querystring = 'CALL addLog(' + userId + ', ' + urlId + ', ' + tagId + ', ' + title + ', ' + description + ', @successfullyAdded); SELECT @successfullyAdded AS successfullyAdded;';	
						
						connection.query(querystring, function (err, result){
							if (err){
								res.json({
									success: false,
									message: 'There was an error while connecting to the database!'
								});	
							} else {
								var successfullyAdded = result[1][0]['successfullyAdded'];
								if(successfullyAdded == 1){
									res.json({
										success: true,
										message: 'Log addedd successfully!'
									});	
								} else {
									res.json({
										success: false,
										message: 'Duplicate link!'
									});	
								}
							}
						})
					}
				})
			}
		})
	},

	list: function (req, res){
		var userId = mysql.escape(req.body.userId);
		var querystring = 'SELECT '+ 
			schema.user.tablename + '.' + schema.user.id + ' AS user_id, ' + 
			schema.url.tablename + '.' + schema.url.id + ' AS url_id, ' + 
			schema.url.tablename + '.' + schema.url.url + ' AS url, ' + 
			schema.log.tablename + '.' + schema.log.title + ' AS title, ' + 
			schema.log.tablename + '.' + schema.log.description + ' AS description ' + 
			' FROM ' + schema.log.tablename + 
			' INNER JOIN ' + schema.user.tablename + ' ON ' + 
			schema.log.tablename + '.' + schema.log.user_id + ' = ' + schema.user.tablename + '.' + schema.user.id + 
			' INNER JOIN ' + schema.url.tablename + ' ON ' + 
			schema.log.tablename + '.' + schema.log.url_id + ' = ' + schema.url.tablename + '.' + schema.url.id +
			' WHERE ' + schema.user.tablename + '.' + schema.user.id + ' = ' + userId;
		
		connection.query(querystring, function (err, urlData) {
			if (err){
				res.json({
					success: false,
					message: 'There was an error while connecting to the database!'
				});
			} else {

				var querystring = 'SELECT ' +
					schema.log.tablename + '.' + schema.log.user_id + ' AS user_id, ' + 
					schema.log.tablename + '.' + schema.log.url_id + ' AS url_id, ' +
					schema.tag.tablename + '.' + schema.tag.name + ' AS tag_name' +
					' FROM ' + schema.log.tablename +
					' INNER JOIN ' + schema.tag_meta.tablename + ' ON ' +
					schema.log.tablename + '.' + schema.log.user_id + ' = ' + schema.tag_meta.tablename + '.' + schema.tag_meta.user_id + ' AND ' + 
					schema.log.tablename + '.' + schema.log.url_id + ' = ' + schema.tag_meta.tablename + '.' + schema.tag_meta.url_id +
					' INNER JOIN ' + schema.tag.tablename + ' ON ' + 
					schema.tag_meta.tablename + '.' + schema.tag_meta.tag_id + ' = ' + schema.tag.tablename + '.' + schema.tag.id +
					' WHERE ' + schema.log.tablename + '.' + schema.log.user_id + ' = ' + userId;

				connection.query(querystring, function (err, tagData) {

					urlData.map(function (obj){

						obj.tags = [];

						tagData.forEach(function (element){
							if(obj.user_id == element.user_id && obj.url_id == element.url_id){
								obj.tags.push(element.tag_name);
							}
						});

					})

					res.json({
						success: true,
						data: urlData
					});
				})
			}

		})

	}

}

module.exports = log;