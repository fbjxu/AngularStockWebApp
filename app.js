var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var token = "token=a4d9cb249227d4a1c64fac98783787069f17c866"

const fetch = require('node-fetch');


app.get('/api/summary/:ticker', function (req, res) {
    fetch("https://api.tiingo.com/tiingo/daily/"+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

app.get('/api/pricesummary/:ticker', function (req, res) {

    fetch("https://api.tiingo.com/iex/"+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

app.listen(80, function () {
console.log('CORS- enabled web server listening on port 80')
});