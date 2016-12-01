var express = require('express');

// load json tree from homework 2
const root = require('./ha2.json');

function find(current, path) {
    if(path.length == 0) {
        return current;
    } else if (typeof current == 'object') {
        var pathSegment = path.shift();

        if(typeof current[pathSegment] != 'undefined') {
            return find(current[pathSegment], path);
        }
    }
  }

// actual web application with express
var app = express();

// serve static files (index.html and index.js) for client from folder 'public'
app.use(express.static('./public'));

// requests to 'children'
app.get('/children', function (req, res) {

    var path = req.query.path;

    if(typeof path == 'undefined'){
        res.status(400).send('Bad Request');
    } else {

        var node = root;

        if(path != '') {
            path = path.split(',');
            node = find(node, path);
        }

        if(typeof node == 'number' || typeof node == 'undefined') {
            res.status(404).send('Not found .... ha ha ha'); // this is not an object
        } else {
            var result = [];
            for(var i in node){
                result.push(i);
            }
            res.status(200).send(result);
        }
    }
});

// and go
app.listen(3000, function () {
    console.log('Exercise 5, app listening on port 3000!')
})
