const express = require('express');
const cheerio = require('cheerio');
const request = require('request');
let http = require('http');
let https = require('https');
const delay = 10000;
const nodes = [
    {
        source: "google",
        path: ".YMlKec.fxKbKc",
        options : {
            url: 'https://www.google.com/finance/quote/EUR-USD',
            headers: {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                'cache-control' : 'no-cache'
            }
        }
    },
    {
        source: "investing",
        path: "div.top.bold.inlineblock span.arial_26.inlineblock.pid-1-last",
        options : {
            url: 'https://br.investing.com/currencies/eur-usd',
            headers: {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                'cache-control' : 'no-cache'
            }
        }
    },
    {
        source: "bloomberg",
        path: "span.priceText__1853e8a5",
        options : {
            url: 'https://www.bloomberg.com/quote/EURUSD:CUR',
            headers: {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
                'cache-control' : 'no-cache'
            }
        }
    }
];

const init = () => {
    app = express();
    http.createServer(app).listen(3000);
    start_api();
    //start_scraper();
};

const start_scraper = () => {
    setInterval(() => {
        let rand = Math.round(Math.random() * (nodes.length - 1));
        request(nodes[rand].options, nodes[rand].callback);
    }, delay);
}

const getValue = (source, path, error, response, body) => {
    let res = {};
    let dt = new Date();
    if (!error && response && response.statusCode < 300) {
        let $ = cheerio.load(body);
        let eur_usd = $(path);
        res = {
            source: source,
            date: dt.toUTCString(),
            value: eur_usd.text().replace(',', '.')
        }
        console.log(res);
    } else {     
        console.log(error);
    }
    return res;
}

const start_api = () => {
    app.get('/eurusd', (req, res) => {
        let value = {};
        let rand = Math.round(Math.random() * (nodes.length - 1));
        request(nodes[rand].options, (error, response, body) => {
            res.send(getValue(nodes[rand].source, nodes[rand].path, error, response, body));
        });
    });
};

init();