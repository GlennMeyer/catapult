import mongodb from 'mongodb';

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/test';

MongoClient.connect(url, (err, db) => {
	if ( err ){
		console.log(`Unable to connect to mongoDB server.  Error: ${err}`);
	} else {
		console.log(`Connection established to ${url}`);
		
		// create collection if not exists
		let collection = db.collection('users');

		let user1 = {name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']};
    	let user2 = {name: 'modulus user', age: 22, roles: ['user']};
    	let user3 = {name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user']};

    	collection.insert([user1, user2, user3], (err, res) => {
    		console.log(err || `Inserted ${res.insertedCount} documents into the "users" collection. The documents inserted with "_id" were ${JSON.stringify(res.ops)}`);
    	});

    	collection.update({name: 'modulus user'}, {$set: {"enabled": "false"}}, (err, res) => {
    		if (err) {
    			console.log(`Unable to update collection "users". Error: ${err}`);
    		} else if (res.result.nModified) {
    			console.log(`Updated ${res.result.nModified} document(s) in the "users" collection.`);
    		} else {
    			console.log('No document(s) found with the defined "find" criteria.')
    		}
    	});

    	collection.find({name: 'modulus user'}).toArray(function (err, res) {
			if (err) {
				console.log(`Unable to query collection "users". Error: ${err}`);
			} else if (res.length) {
				console.log(`Found ${res.length} document(s) in the "users" collection. The document(s) found were ${JSON.stringify(res)}`);
			} else {
				console.log('No document(s) found with the defined "find" criteria!');
			}
		});

		let cursor = collection.find({name: /modulus/});

		cursor.sort({age: -1});
		cursor.limit(10);
		cursor.skip(0);
		cursor.each((err, res) => {
			if (res) console.log(err ? `Unable to query collection "users". Error: ${err}` : `Fetched: ${JSON.stringify(res)}`);
		});
	}

	db.close();
});