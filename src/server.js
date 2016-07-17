import express from 'express';
import SMTPServer from 'smtp-server';
import fs from 'fs';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

const server = new SMTPServer({
	secure: true,
	key: fs.readFileSync('private.key'),
	cert: fs.readFileSync('server.crt')
});

server.listen(465);