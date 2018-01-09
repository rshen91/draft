const express = require('express');
const router = express.Router();
var elasticsearch = require('elasticsearch');



router.get("/", (req, res) => {
    res.render('index');
    console.log(res.status);
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        apiVersion: '5.6',
    });
    client.ping({
        requestTimeout: 30000,
    }, function(error) {
        if (error) {
            console.error('ES cluster is down');
        } else {
            console.log('All is well!');
        }
    });
    client.search({
        index: 'books_new',
        body: {
            query: {
                match_all: {
                }
            }
        }
    }).then(function(resp){
        var hits = resp.hits.hits;
        console.log(hits);
    }, function (err) {
        console.trace(err.message);
    });
});

module.exports = router;