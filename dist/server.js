'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('./db/mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

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