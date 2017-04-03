var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/maybe it will work', function (req, res) {
	res.send('Lets start');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});