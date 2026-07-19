const http = require('https');

const url = 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0222NK-FRE-GDN-AssortedNecklaceSets_1.jpg';

http.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('CORS Headers:');
  console.log('access-control-allow-origin:', res.headers['access-control-allow-origin']);
  console.log('access-control-allow-methods:', res.headers['access-control-allow-methods']);
  console.log('all headers:', res.headers);
  process.exit(0);
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
