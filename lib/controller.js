var fs = require('fs');
var express = require('express');
var app = express();
var juice_data = fs.readFileSync('./juice_data/juice_orders','utf8');
app.use(express.static('./public'))

app.get('/',function(req,res){
	res.redirect('/html/index.html');
})

app.get('/html/juicedata',function(req,res){
	res.send(juice_data);
});

module.exports = app;