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
		tablename: 'entry',
		id: 'id',
		url: 'url'
	},
	tag: {
		tablename: 'tag',
		id: 'id',
		name: 'name'
	},
	user_entry: {
		tablename: 'user_entry',
		user_id: 'user_id',
		url_id: 'url_id',
		tag_id: 'tag_id',
		title: 'title',
		description: 'description'
	}
}

module.exports = {
	secretPassword: secretPassword,
	connection: connection,
	schema: schema
}