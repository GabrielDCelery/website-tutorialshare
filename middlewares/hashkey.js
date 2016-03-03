var md5 = require('md5');

function generateHashKey(string){
	return parseInt(md5(string), 16) % 999;
}

var hashKey = {

	add: function(req, res, next){
		if(req.body.url){
			req.body.urlHashKey = generateHashKey(req.body.url);
		}

		if(req.body.tags.length > 0){
			req.body.tagsHashKeys = req.body.tags.map(generateHashKey);
		}

		next();
	}

}

module.exports = hashKey;