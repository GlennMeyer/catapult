'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hostname = '127.0.0.1';
var port = 3000;

var app = (0, _express2.default)();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, hostname, function () {
  console.log('Server running at http://' + hostname + ':' + port + '/');
});

// Standard GET request from abstracted method

_http2.default.get('http://www.google.com/index.html', function (res) {
  console.log('Got response: ' + res.statusCode);
  // consume response body
  res.on('data', function (chunk) {
    console.log('CHUNK: ' + chunk);
  });
  res.resume();
}).on('error', function (e) {
  console.log('Got error: ' + e.message);
});

// Standard POST request through request method

// http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fwww.engadget.com%2Frss.xml&count=3

var options = {
  hostname: 'cloud.feedly.com',
  port: 80,
  path: '/v3/mixes/contents?streamId=feed/http://www.engadget.com/rss.xml&count=3',
  method: 'GET',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Content-Length': Buffer.byteLength(postData)
  },
  auth: "OAuth YourAuthToken"
};

var test = '';

var req = _http2.default.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');

  res.on('data', function (chunk) {
    console.log('CHUNK: ' + chunk);
    test += chunk;
  });

  res.on('end', function () {
    console.log('No more data in response.');
    console.log('BODY: ' + test);
  });
});

req.on('error', function (e) {
  console.log('problem with request: ' + e.message);
});

req.end();