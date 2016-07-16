import express from 'express';
import {sequelize, User, Employee, Pub, Foo} from './db/models';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});