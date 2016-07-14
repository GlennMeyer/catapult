'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hostname = '127.0.0.1';
var port = 3000;

var app = (0, _express2.default)();
var assetFolder = _path2.default.resolve(__dirname, '../client/public');

app.get('/', function (req, res) {
	res.sendFile(assetFolder + '/index.html');
});

app.listen(port, hostname, function () {
	console.log('Server running at http://' + hostname + ':' + port + '/');
});