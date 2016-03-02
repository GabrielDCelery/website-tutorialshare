var mysql = require('mysql');

var secretPassword = 'password';

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password : null,
	database : 'tutorialshare'
});

var schema = {
	user: {
		tablename: 'user',
		id: 'id',
		name: 'name',
		password: 'password',
		email: 'email'
	},
	url: {
		tablename: 'url',
		id: 'id',
		url: 'url'
	},
	tag: {
		tablename: 'tag',
		id: 'id',
		name: 'name'
	},
	tag_meta: {
		tablename: 'tag_meta',
		user_id: 'user_id',
		url_id: 'url_id',
		tag_id: 'tag_id'
	},
	log: {
		tablename: 'log',
		user_id: 'user_id',
		url_id: 'url_id',
		title: 'title',
		description: 'description'
	}
}

module.exports = {
	secretPassword: secretPassword,
	connection: connection,
	schema: schema
}