var http = require('http'),
	assert = require('assert');

var opts = {
	host:'localhost',
	port: 8000,
	path: '/send',
	method: 'POST',
	headers: {'content-type': 'application/x-wwww-form-urlencoded'}
};

//like the http.Server,  with only the res object,   the call Back is the req normally sent
var req = http.request(opts, function(res){
	res.setEncoding('utf8');

	var data = "";

	res.on('data', function(d){
		data+=d;
	});

	console.log('data: '+data);


	res.on('end', function(){
		assert.strictEqual(data, '{"status":"ok", "message":"Tweet received"}');
		console.log("Success, Tweet received");
	});
})

req.write('tweet=test');
req.end();
