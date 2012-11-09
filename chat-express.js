var express = require('express');
var app = express();
/*app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret goes here' }));
  app.use(express.bodyParser());
  app.use(app.router);
});
*/

app.listen(8000)
var tweets = []

app.get('/', function(req, res) {
	res.send('Welcome to Node Twitter')
})

app.post('/send', express.bodyParser(), function(req, res) {
	if (req.body && req.body.tweet) {
		tweets.push(req.body.tweet)
		res.send({status:"ok", message:"Tweet received"});
	} else {
	//no tweet?
		res.send({status:"nok", message:"No tweet received"});
	}
})

app.get('/tweets', function(req,res) {
	res.send(tweets)
})

console.log("Server Running");

