var express = require('express');
var cors = require('cors');
var app = express();
var url = "https://api.tiingo.com/tiingo/daily/";
var token = "token=a4d9cb249227d4a1c64fac98783787069f17c866"
app.use(cors());
const fetch = require('node-fetch');


app.get('/api/summary/:ticker', function (req, res) {
    fetch(url+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

app.listen(80, function () {
console.log('CORS- enabled web server listening on port 80')
});