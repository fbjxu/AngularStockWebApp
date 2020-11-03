//packages
var express = require('express');
var cors = require('cors');
const fetch = require('node-fetch');
var app = express();
app.use(cors());
const path = require('path');
var portNum = 8080;
// console.log(__dirname);

//helper attributes
var token = "token=a4d9cb249227d4a1c64fac98783787069f17c866";
var newstoken = "fd84f96ea1e248a29d8fa184296cdb8f";
var today = getDate(new Date());
var prevDate = getPrevDate(new Date());

//helper functions
function getDate(date) {
    var date = new Date(date),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

function getPrevDate(date) {
    var date = new Date(date),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year-2, month, day].join('-');
}

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/stock-web-app'));

// app.get('/', function(req,res) {
//     res.sendFile(path.join(__dirname+'/dist/stock-web-app/index.html'));
// });

// app.get('/watchlist', function(req,res) {
//     res.sendFile(path.join(__dirname+'/dist/stock-web-app/index.html'));
// });

// app.get('/portfolio', function(req,res) {
//     res.sendFile(path.join(__dirname+'/dist/stock-web-app/index.html'));
// });

// app.get('/details/:ticker', function(req,res) {
//     res.sendFile(path.join(__dirname+'/dist/stock-web-app/index.html'));
// });

//API: automcomplete
app.get('/api/autocomplete/:ticker', function (req, res) {

    fetch("https://api.tiingo.com/tiingo/utilities/search/"+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

//API: company description summary
app.get('/api/summary/:ticker', function (req, res) {
    fetch("https://api.tiingo.com/tiingo/daily/"+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

//API: priceSummary
app.get('/api/pricesummary/:ticker', function (req, res) {

    fetch("https://api.tiingo.com/iex/"+req.params.ticker+"?" + token, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
    
});

//API: dailyChart
app.get('/api/dailychartsummary/:ticker', function (req, res) {
    var startDate  
    console.log("dailychart API", "https://api.tiingo.com/iex/"+req.params.ticker+"/prices?"+token+"&startDate="+today+"&resampleFreq=4min&columns=close,volume");
    fetch("https://api.tiingo.com/iex/"+req.params.ticker+"/prices?"+token+"&startDate="+today+"&resampleFreq=4min&columns=close,volume", {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
});

//API: dailyChart closed
app.get('/api/dailychartsummaryclosed/:ticker/:date', function (req, res) {
    var startDate  
    fetch("https://api.tiingo.com/iex/"+req.params.ticker+"/prices?"+token+"&startDate="+req.params.date+"&resampleFreq=4min&columns=close,volume", {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
});

//API: historyChart
app.get('/api/historychartsummary/:ticker', function (req, res) {
    var startDate  
    fetch("https://api.tiingo.com/iex/"+req.params.ticker+"/prices?"+token+"&startDate="+prevDate+"&resampleFreq=12hour&columns=open,high,low,close,volume", {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data)});
});

//API: News
app.get('/api/news/:ticker', function (req, res) {
    fetch("https://newsapi.org/v2/everything?q="+req.params.ticker+"&apiKey="+newstoken, {
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data=>{res.json(data["articles"])});//only return articles
});


//Open port
app.listen(portNum, function () {
    console.log('CORS- enabled web server listening on port: ', portNum);
});