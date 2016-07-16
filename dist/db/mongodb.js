'use strict';

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = _mongodb2.default.MongoClient;

var url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to mongoDB server.  Error: ' + err);
	} else {
		console.log('Connection established to ' + url);

		// create collection if not exists
		var collection = db.collection('users');

		var user1 = { name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] };
		var user2 = { name: 'modulus user', age: 22, roles: ['user'] };
		var user3 = { name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user'] };

		collection.insert([user1, user2, user3], function (err, res) {
			console.log(err || 'Inserted ' + res.insertedCount + ' documents into the "users" collection. The documents inserted with "_id" were ' + JSON.stringify(res.ops));
		});

		collection.update({ name: 'modulus user' }, { $set: { "enabled": "false" } }, function (err, res) {
			if (err) {
				console.log('Unable to update collection "users". Error: ' + err);
			} else if (res.result.nModified) {
				console.log('Updated ' + res.result.nModified + ' document(s) in the "users" collection.');
			} else {
				console.log('No document(s) found with the defined "find" criteria.');
			}
		});

		collection.find({ name: 'modulus user' }).toArray(function (err, res) {
			if (err) {
				console.log('Unable to query collection "users". Error: ' + err);
			} else if (res.length) {
				console.log('Found ' + res.length + ' document(s) in the "users" collection. The document(s) found were ' + JSON.stringify(res));
			} else {
				console.log('No document(s) found with the defined "find" criteria!');
			}
		});

		var cursor = collection.find({ name: /modulus/ });

		cursor.sort({ age: -1 });
		cursor.limit(10);
		cursor.skip(0);
		cursor.each(function (err, res) {
			if (res) console.log(err ? 'Unable to query collection "users". Error: ' + err : 'Fetched: ' + JSON.stringify(res));
		});
	}

	db.close();
});