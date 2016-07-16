'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('./db/models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hostname = '127.0.0.1';
var port = 3000;
var app = (0, _express2.default)();

app.listen(port, hostname, function () {
	console.log('Server running at http://' + hostname + ':' + port + '/');
});