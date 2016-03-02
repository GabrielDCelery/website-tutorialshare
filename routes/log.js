var express = require('express');
var mysql = require('mysql');
var md5 = require('md5');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var connection = globalRequire('config/db').connection;
var secretPassword = globalRequire('config/db').secretPassword;
var schema = globalRequire('config/db').schema;

var log = {

	list: function (req, res){
		var userId = mysql.escape(req.body.id);
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