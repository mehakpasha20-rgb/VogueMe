const http = require('http');

http.get('http://localhost:5000/api/jewellery', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    try {
      const items = JSON.parse(data);
      console.log(`Successfully fetched ${items.length} jewellery items from database API!`);
    } catch (e) {
      console.log('Response was not JSON:', data.substring(0, 100));
    }
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('API Test Error:', err.message);
  process.exit(1);
});
