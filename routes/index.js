const express = require('express');
const router = express.Router();
var elasticsearch = require('elasticsearch');



router.get("/", (req, res) => {
    res.render('index');
    console.log(res.status);
    var client = new elasticsearch.Client({
        host: 'localhost:9200',
        // apiVersion: '6.2.2',
        httpAuth: 'elastic:changeme'
    })
    client.ping({
        requestTimeout: 30000,
    }, function(error) {
        if (error) {
            console.error('ES cluster is down');
        } else {
            console.log("Are you here?");
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

// PUT books_new
// {
//   "settings": {
//     "index": {
//       "number_of_shards": "1",
//       "number_of_replicas": "0"
//     }
//   },
//   "mappings": {
//     "books": {
//       "properties": {
//         "title": {
//           "type": "keyword"
//         },
//         "author": {
//           "type": "keyword"
//         },
//         "nationality": {
//           "type": "keyword"
//         },
//         "publication_year": {
//           "type": "text"
//         },
//         "completion": {
//           "type": "text"
//         },
//         "number_of_times_read": {
//           "type": "text"
//         },
//         "number_of_pages": {
//           "type": "text"
//         }
//       }
//     }
//   }
// }

// PUT books_new
// {
//   "settings": {
//     "index": {
//       "number_of_shards": "1",
//       "number_of_replicas": "0"
//     }
//   },
//   "mappings": {
//     "books": {
//       "properties": {
//         "title": {
//           "type": "keyword"
//         },
//         "author": {
//           "type": "keyword"
//         },
//         "nationality": {
//           "type": "keyword"
//         },
//         "publication_year": {
//           "type": "text"
//         },
//         "completion": {
//           "type": "text"
//         },
//         "number_of_times_read": {
//           "type": "long"
//         },
//         "number_of_pages": {
//           "type": "long"
//         }
//       }
//     }
//   }
// }

// POST books_new/books/1
// {
// "title": "The Fifth Season",
// "author": "N.K. Jemisin",
// "nationality": "American",
// "publication_year": "2015",
// "completion": "2016",
// "number_of_times_read": 1,
// "number_of_pages": 468
// }