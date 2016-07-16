import express from 'express';
import mongodb from './db/mongodb'

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

