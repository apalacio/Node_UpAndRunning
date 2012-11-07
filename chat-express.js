var express = require('express');

var app = express();
app.listen(8000);

var tweets = [];

app.get('/', function(req, res){
	res.send('Welcome to Node Twitter')
});


app.get('/tweets', function(req, res){
	res.send(tweets);
});


app.post('/send', express.bodyParser(), function(req, res){

	console.log('body: '+ req.body);
	console.log('body.tweet: '+ req.body.tweet);

	if(req.body && req.body.tweet) {
		tweets.push(req.body.tweet);
		res.send({
			status: "ok",
			message: "Tweets received"
		});
	} else{
		console.log('Llegué..');	
		//no tweet ?		
		res.send({
			status: "nok",
			message: "No tweet received"
		});
	}
});

console.log("Server Running");

