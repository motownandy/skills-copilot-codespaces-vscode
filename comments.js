// Create web server

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var comments = require('./comments');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var requestUrl = url.parse(request.url);
  if (requestUrl.pathname === '/comment' && request.method === 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });
    request.on('end', function () {
      var comment = qs.parse(body);
      comments.add(comment);
      response.writeHead(200, {"Content-Type": "text/plain"});
      response.end();
    });
  } else if (requestUrl.pathname === '/comments' && request.method === 'GET') {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(comments.list()));
    response.end();
  } else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.end("Not Found");
  }
});

// Listen on port 8000, IP defaults to
