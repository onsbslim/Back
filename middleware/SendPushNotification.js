const http2 = require('http2');
const fs = require('fs');

/* 
  Use 'https://api.push.apple.com' for production build
*/

host = 'https://api.sandbox.push.apple.com'
path = '/3/device/3b6fff6090dc686994060806953851c59992a2f976ce998bd0c700243bcaf574'

/*
Using certificate converted from p12.
The code assumes that your certificate file is in same directory.
Replace/rename as you please
*/

const client = http2.connect(host, {
  key: fs.readFileSync('./certifs/certifDev.key.pem'),
  cert: fs.readFileSync('./certifs/certifDev.crt.pem')
});

client.on('error', (err) => console.error(err));

body = {
  "aps": {
    "alert": "hello sihem",
    "content-badge": 1
  }
}

headers = {
  ':method': 'POST',
  'apns-topic': 'com.dormalcorp.companyproject', //you application bundle ID
  ':scheme': 'https',
  ':path': path
}

const request = client.request(headers);

request.on('response', (headers, flags) => {
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`);
  }
});

request.setEncoding('utf8');

let data = ''
request.on('data', (chunk) => { data += chunk; });
request.write(JSON.stringify(body))
request.on('end', () => {
console.log(`\n${data}`);
client.close();
});
request.end();