import express from 'express';
import path from 'path';


const hostname = '127.0.0.1';
const port = 3000;

const app = express();
const assetFolder = path.resolve(__dirname, '../client/');
const moduleFolder = path.resolve(__dirname, '../node_modules');

app.get('/', (req, res) => {
	res.sendFile(`${assetFolder}/index.html`);
});

app.use('/', express.static(assetFolder));
app.use('/modules', express.static(moduleFolder));


app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

