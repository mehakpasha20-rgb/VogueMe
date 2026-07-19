const fs = require('fs');

async function testUrl(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) return console.log(url, 'FAILED', res.status);
        const data = await res.json();
        console.log(url, 'SUCCESS', data.products ? data.products.length : 'No products array');
    } catch (e) {
        console.log(url, 'ERROR', e.message);
    }
}

async function run() {
    await testUrl('https://www.limelight.pk/collections/co-ords/products.json');
    await testUrl('https://www.limelight.pk/collections/formals/products.json');
    await testUrl('https://www.sanasafinaz.com/collections/ready-to-wear/products.json');
    await testUrl('https://www.mariab.pk/collections/ready-to-wear/products.json');
    await testUrl('https://pk.khaadi.com/ready-to-wear.html'); // just to check if it's html
    await testUrl('https://www.sapphireonline.pk/collections/ready-to-wear/products.json');
    await testUrl('https://www.asifaandnabeel.pk/collections/formals/products.json');
    await testUrl('https://www.gulahmedshop.com/womens-clothing/ideas-pret/products.json');
}

run();
