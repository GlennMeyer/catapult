import express from 'express';
import http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

// Standard GET request from abstracted method

http.get('http://www.google.com/index.html', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body

  res.on('data', (chunk) => {
  	console.log(`CHUNK: ${chunk}`);
  })

  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});

// Standard POST request through request method

// http://cloud.feedly.com/v3/mixes/contents?streamId=feed%2Fhttp%3A%2F%2Fwww.engadget.com%2Frss.xml&count=3

const options = {
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

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  res.setEncoding('utf8');

  res.on('data', (chunk) => {
    console.log(`CHUNK: ${chunk}`);
  	test += chunk;
  });

  res.on('end', () => {
    console.log('No more data in response.');
    console.log(`BODY: ${test}`);
  });

});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

req.end();