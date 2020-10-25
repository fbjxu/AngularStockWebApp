var express = require('express');
var cors = require('cors');
var app = express();
var url = "https://api.tiingo.com/tiingo/daily/aapl?token=a4d9cb249227d4a1c64fac98783787069f17c866"
app.use(cors());
const fetch = require('node-fetch');


app.get('/', function (req, res) {
    data = fetch('https://api.tiingo.com/tiingo/daily/aapl?token=a4d9cb249227d4a1c64fac98783787069f17c866')
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

app.listen(80, function () {
console.log('CORS- enabled web server listening on port 80')
});