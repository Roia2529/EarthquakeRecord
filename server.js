// modules =================================================
var express        = require('express');
var app            = express();
// configuration ===========================================
	
// config files
var port = process.env.PORT || 8080; // set our port
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./routes/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 