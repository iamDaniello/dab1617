var express = require('express');

var Mustache = require('mustache');
var fs = require('fs');

// load json tree from homework 2
const root = require('./ha2.json');

// I don't like mixing markup and code, so I'm using mustache template engine and templates for..
// the main page
const templateIndexFile  = './index.html.mst';
const templateIndex      = fs.readFileSync(templateIndexFile, { encoding : 'utf8'});

// a tree leaf
const templateLeafFile  = './leaf.html.mst';
const templateLeaf     = fs.readFileSync(templateLeafFile, { encoding : 'utf8'});

// a tree node
const templateNodeFile  = './node.html.mst';
const templateNode      = fs.readFileSync(templateNodeFile, { encoding : 'utf8'});

// this is an extended version of the find function from ha2, returning not only a flag for the success, but also
// some generated html
function convertToHtml(node, value) {
    var html = '';
    var found = false;

    for (var i in node) {
        if (typeof node[i] == 'number') {
            html += Mustache.render(templateLeaf, {
                value: node[i],
                style: node[i] === value ? 'highlight' : ''
            });
            found |= node[i] === value;
        } else if (typeof node[i] === 'object') {
            var conversion = convertToHtml(node[i], value);
            html += conversion.html;
            found |= conversion.found;
        }
    }

    return {
        html : Mustache.render(templateNode, {
            name: i,
            style: found ? 'highlight' : '',
            html: html
        }),
        found : found
    }
}

// actual web application with express
var app = express();

// root requests
app.get('/', function (req, res) {
    res.send(Mustache.render(templateIndex, {
        html: convertToHtml(root).html
    }));
});

// requests to 'pathTo'
app.get('/pathTo', function (req, res) {

    var value = req.query.value;

    if(isNaN(value)){
        res.status(400).send('Bad Request');
    } else {
        res.send(Mustache.render(templateIndex, {
            html: convertToHtml(root, parseInt(value)).html
        }));
    }
});

app.get('/test', function (req, res) {

    res.send('<body><h1>hello world</h1></body>');
});


// an go
app.listen(3000, function () {
    console.log('Exercise 4, app listening on port 3000!')
})
