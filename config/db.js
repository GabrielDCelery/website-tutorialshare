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
	}
}

module.exports = {
	secretPassword: secretPassword,
	connection: connection,
	schema: schema
}