const fs = require('fs');

async function fetchData(url) {
    try {
        console.log(`Fetching from: ${url}`);
        const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!res.ok) {
            console.log(`Failed to fetch ${url}, status: ${res.status}`);
            return [];
        }
        const data = await res.json();
        const products = data.products || [];
        // Tag products with their source URL to identify them easily
        return products.map(p => ({ ...p, feedUrl: url }));
    } catch (e) {
        console.log(`Error fetching ${url}:`, e.message);
        return [];
    }
}

function detectColor(title, tags, body) {
    const text = `${title} ${tags.join(' ')} ${body}`.toLowerCase();
    if (text.includes('sky blue') || text.includes('light blue') || text.includes('powder blue')) return 'Blue';
    if (text.includes('navy') || text.includes('indigo') || text.includes('blue')) return 'Blue';
    if (text.includes('dusty pink') || text.includes('rose pink') || text.includes('pink') || text.includes('rose') || text.includes('magenta') || text.includes('peach') || text.includes('coral')) return 'Pink';
    if (text.includes('olive') || text.includes('green') || text.includes('emerald') || text.includes('mint') || text.includes('teal') || text.includes('khaki')) return 'Green';
    if (text.includes('red') || text.includes('maroon') || text.includes('crimson') || text.includes('ruby') || text.includes('burgundy') || text.includes('plum')) return 'Red';
    if (text.includes('white') || text.includes('ivory') || text.includes('cream') || text.includes('off-white') || text.includes('offwhite')) return 'White';
    if (text.includes('black') || text.includes('charcoal') || text.includes('jet black')) return 'Black';
    if (text.includes('yellow') || text.includes('mustard') || text.includes('gold')) return 'Yellow';
    if (text.includes('orange') || text.includes('rust')) return 'Orange';
    if (text.includes('purple') || text.includes('lavender') || text.includes('mauve') || text.includes('lilac')) return 'Purple';
    if (text.includes('brown') || text.includes('tan') || text.includes('beige')) return 'Brown';
    
    // Fallback to a random selection from primary colors for variety
    const colors = ['Red', 'Blue', 'Green', 'White', 'Pink', 'Black', 'Yellow', 'Orange', 'Purple'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function cleanDressName(title, color, category, isAkbar) {
    let name = title.replace(/'/g, "\\'").trim();
    // Remove codes at the end (e.g. "- 1721" or " 3479")
    name = name.replace(/\s*-\s*\d+$/, '');
    name = name.replace(/\s*\d+$/, '');
    name = name.replace(/\s*-\s*[A-Z\d]+$/i, ''); // e.g. "Pret - RTW24"

    const lower = name.toLowerCase();
    
    // If the name is generic, generate an elegant descriptive name
    if (lower === 'kurta' || lower === 'suit' || lower === 'ready to wear' || lower === 'pret' || lower.startsWith('kurta -') || lower.startsWith('suit -') || lower.match(/^[a-z\s]+-\s*\d+$/i) || name.length < 5) {
        if (category === 'Casual') {
            return `Elegant ${color} Printed Lawn Shalwar Kameez`;
        } else if (category === 'Wedding') {
            return `Exquisite ${color} ${isAkbar ? 'Akbar Aslam ' : ''}Bridal Lehenga Suit`;
        } else if (category === 'Traditional') {
            return `Classic ${color} Embroidered Traditional Shalwar Kameez`;
        } else if (category === 'Formal') {
            return `Sophisticated ${color} Luxury Silk Kurta Set`;
        } else if (category === 'Party') {
            return `Stunning ${color} Festive Chiffon Dress`;
        }
    }
    
    // Prefix if it doesn't mention the style clearly
    if (!lower.includes('kurta') && !lower.includes('suit') && !lower.includes('kameez') && !lower.includes('maxi') && !lower.includes('lehenga') && !lower.includes('dress') && !lower.includes('frock') && !lower.includes('co-ord')) {
        name = `${name} Kurta Suit`;
    }

    if (isAkbar && !lower.includes('akbar')) {
        name = `Akbar Aslam ${name}`;
    }
    
    return name;
}

function normalizePrice(originalPrice) {
    let price = parseFloat(originalPrice) || 1500;
    if (price > 100000) price = price / 100;
    if (price > 10000) {
        price = Math.round(price / 5);
    } else if (price < 100) {
        price = price * 25;
    }
    if (price < 1100) price = 1100 + (price % 500);
    if (price > 4900) price = 3500 + (price % 1000);
    return Math.round(price);
}

async function run() {
    try {
        const urls = [
            'https://akbaraslam.com/products.json?limit=250',
            'https://www.limelight.pk/products.json?limit=250',
            'https://zellbury.com/collections/pret/products.json?limit=250',
            'https://www.sanasafinaz.com/collections/ready-to-wear/products.json?limit=250',
            'https://www.asifaandnabeel.pk/collections/formals/products.json?limit=250'
        ];

        let allProducts = [];
        for (const url of urls) {
            allProducts = allProducts.concat(await fetchData(url));
        }

        console.log(`Total raw products fetched: ${allProducts.length}`);

        // Strictly exclude kids, men, and non-dresses
        const isWomensDress = (p) => {
            const title = p.title.toLowerCase();
            const tags = (p.tags || []).map(t => t.toLowerCase());
            const type = (p.product_type || '').toLowerCase();
            const body = (p.body_html || '').toLowerCase();
            const imageSrc = p.images && p.images.length > 0 ? p.images[0].src.toLowerCase() : '';
            
            // Check for kids/men exclusions
            const kidsExclude = ['kids', 'girls', 'boys', 'child', 'little', 'baby', 'toddler', 'junior', 'teen', 'infant', 'men', 'mens', 'boy', 'girl', 'children', 'young', 'youth', 'kid', 'childs'];
            if (kidsExclude.some(word => title.includes(word) || tags.some(t => t.includes(word)) || type.includes(word) || body.includes(word))) {
                return false;
            }

            // Exclude Zellbury kids codes (GPS, GPW, BPS, BPW, KPS, KPW) in image filename and tags
            const filename = imageSrc.split('/').pop() || '';
            const isKidsCode = (str) => {
                return /^(gps|gpw|bps|bpw|kps|kpw)/.test(str);
            };
            if (isKidsCode(filename) || tags.some(isKidsCode)) {
                console.log(`Excluding Zellbury kids dress: ${p.title} (${filename})`);
                return false;
            }

            // Exclude accessories / non-clothing
            const accessoriesExclude = ['bag', 'perfume', 'wallet', 'footwear', 'shoes', 'scarf', 'jewelry', 'jewellery', 'unstitched', 'fabric', 'bottoms', 'trousers only', 'pants only', 'dupatta only', 'clutch', 'earring', 'necklace', 'ring', 'bracelet'];
            if (accessoriesExclude.some(word => title.includes(word) || tags.some(t => t.includes(word)) || type.includes(word))) {
                return false;
            }

            return true;
        };

        const dressCandidates = allProducts.filter(isWomensDress);
        console.log(`Filtered women\'s dress candidates: ${dressCandidates.length}`);

        // Shuffle to get varied designs
        dressCandidates.sort(() => 0.5 - Math.random());

        // Initialize category structures
        const categories = {
            'Wedding': { max: 18, items: [], keywords: ['akbaraslam', 'bridal', 'lehenga', 'heavy', 'zardosi', 'wedding', 'asifa', 'maxi', 'luxury pret', 'pret luxury', 'formal pret', 'wedding wear', 'fancy'] }, // 18 because we add 2 custom ones to reach 20
            'Party': { max: 15, items: [], keywords: ['party', 'festive', 'chiffon frock', 'silk slip', 'frock', 'chiffon'] }, // 15 because we add 5 custom ones to reach 20
            'Formal': { max: 20, items: [], keywords: ['formal', 'co-ord', 'silk suit', 'raw silk', 'suit', 'blazer', 'grip'] },
            'Traditional': { max: 20, items: [], keywords: ['traditional', 'shalwar', 'kameez', 'peshwas', 'anarkali', 'chikankari', 'block print'] },
            'Casual': { max: 15, items: [], keywords: ['kurta', 'kurti', 'lawn', 'cotton', 'daily', 'printed', 'casual'] } // 15 because we add 5 local ones to reach 20
        };

        const formatProduct = (p, catName) => {
            const tags = p.tags || [];
            const body = p.body_html || '';
            const isAkbar = p.feedUrl.includes('akbaraslam');
            const color = detectColor(p.title, tags, body);
            const name = cleanDressName(p.title, color, catName, isAkbar);
            const price = p.variants && p.variants.length > 0 ? p.variants[0].price : 1990;
            const finalPrice = normalizePrice(price);
            let image = p.images[0].src;
            if (image && image.startsWith('//')) image = 'https:' + image;
            // Clean CDN query params to keep image links clean
            image = image.split('?')[0];

            return {
                name: name,
                category: catName,
                color: color,
                price: finalPrice,
                image: image,
                description: `Premium ${color} Women\\'s ${catName} Suit - Authentic Pakistani Designer Wear.`
            };
        };

        // First pass: Match by strict keywords, prioritizing Akbar Aslam for Wedding
        for (const p of dressCandidates) {
            const isAkbar = p.feedUrl.includes('akbaraslam');
            if (isAkbar && categories['Wedding'].items.length < categories['Wedding'].max) {
                categories['Wedding'].items.push(formatProduct(p, 'Wedding'));
                p.used = true;
            }
        }

        // Standard first pass for remaining items
        for (const p of dressCandidates) {
            if (p.used) continue;
            const title = p.title.toLowerCase();
            const tags = (p.tags || []).map(t => t.toLowerCase());
            const text = `${title} ${tags.join(' ')}`;
            
            for (const [catName, catData] of Object.entries(categories)) {
                if (catData.items.length < catData.max && catData.keywords.some(k => text.includes(k) || (catName === 'Wedding' && p.feedUrl.includes(k)))) {
                    catData.items.push(formatProduct(p, catName));
                    p.used = true;
                    break;
                }
            }
        }

        // Second pass: Fill remaining slots by distributing leftover items to ensure we get exactly 20 items per category
        for (const p of dressCandidates) {
            if (p.used) continue;
            for (const [catName, catData] of Object.entries(categories)) {
                if (catData.items.length < catData.max) {
                    catData.items.push(formatProduct(p, catName));
                    p.used = true;
                    break;
                }
            }
        }

        // Fallback generator if we are still short of items (extremely rare but guarantees 20 items)
        const generateFallbackItem = (catName, index) => {
            const colors = ['Pink', 'Blue', 'Green', 'Red', 'White', 'Black', 'Yellow', 'Orange', 'Purple'];
            const color = colors[index % colors.length];
            const name = cleanDressName('', color, catName, catName === 'Wedding') + ` (Style ${index + 1})`;
            const price = 1290 + (index * 150) % 1500;
            const sampleImages = {
                'Casual': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
                'Wedding': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
                'Traditional': 'https://images.unsplash.com/photo-1583391265517-35bbdad01209?auto=format&fit=crop&w=600&q=80',
                'Formal': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
                'Party': 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80'
            };
            return {
                name: name,
                category: catName,
                color: color,
                price: price,
                image: sampleImages[catName],
                description: `Elegant designer wear - Premium ${color} Women\\'s ${catName} Suit.`
            };
        };

        for (const [catName, catData] of Object.entries(categories)) {
            let index = 1;
            while (catData.items.length < catData.max) {
                console.log(`Warning: Category ${catName} is underfilled, generating fallback item...`);
                catData.items.push(generateFallbackItem(catName, index++));
            }
        }

        // Double check sizes
        console.log('Categories items count:');
        for (const [catName, catData] of Object.entries(categories)) {
            console.log(` - ${catName}: ${catData.items.length}`);
        }

        // Custom 5 user-uploaded Casual dresses
        const customCasualDresses = [
            { name: 'Sky Blue Printed Salwar Kameez (Dress #6)', category: 'Casual', color: 'Blue', price: 1490, image: '/images/dress_6.png', description: 'Elegant sky blue printed salwar kameez with white trousers. Part of our Casual Shalwar Kameez Collection.' },
            { name: 'Elegant White Kurta Suit (Dress #7)', category: 'Casual', color: 'White', price: 1290, image: '/images/dress_7.png', description: 'Graceful solid white cotton salwar kameez kurta set. Part of our Casual Shalwar Kameez Collection.' },
            { name: 'Blue Printed Cotton Salwar (Dress #8)', category: 'Casual', color: 'Blue', price: 1690, image: '/images/dress_8.png', description: 'Beautiful medium blue printed cotton salwar kameez with white block patterns and matching dupatta. Part of our Casual Shalwar Kameez Collection.' },
            { name: 'Dusty Pink Embroidered Suit (Dress #9)', category: 'Casual', color: 'Pink', price: 1890, image: '/images/dress_9.png', description: 'Luxury dusty pink/mauve heavily embroidered salwar kameez with palazzo pants and matching dupatta. Part of our Casual Shalwar Kameez Collection.' },
            { name: 'Olive Embroidered Cotton Palazzo (Dress #10)', category: 'Casual', color: 'Green', price: 1590, image: '/images/dress_10.png', description: 'Stylish olive green embroidered cotton palazzo suit with matching dupatta. Part of our Casual Shalwar Kameez Collection.' }
        ];

        // Custom 2 user-uploaded Wedding dresses from Akbar Aslam
        const customWeddingDresses = [
            { name: 'Akbar Aslam Exquisite Grey Bridal Gown (Wedding #1)', category: 'Wedding', color: 'Silver', price: 3490, image: '/images/wedding_1.png', description: 'Heavily embellished mint-grey bridal maxi/gown with intricate silver embroidery and sheer sleeves. Part of our Luxury Bridal Collection.' },
            { name: 'Akbar Aslam Elegant Peach Gharara Suit (Wedding #2)', category: 'Wedding', color: 'Pink', price: 2990, image: '/images/wedding_2.png', description: 'Graceful pastel peach short kurta heavily embroidered with matching gold-chevron gharara pants. Part of our Luxury Bridal Collection.' }
        ];

        // Custom 5 user-uploaded Party dresses
        const customPartyDresses = [
            { name: 'Elegant Teal Chiffon Maxi Dress (Party #1)', category: 'Party', color: 'Blue', price: 2490, image: '/images/party_1.png', description: 'Stunning teal blue flowy chiffon floor-length maxi dress with classic sheer sleeves and subtle silver embellishments.' },
            { name: 'Stunning White Tiered Ruffled Gharara (Party #2)', category: 'Party', color: 'White', price: 2890, image: '/images/party_2.png', description: 'Flowy pure white georgette short tunic featuring dramatic multi-tiered ruffled sleeves and a matching flared skirt/gharara.' },
            { name: 'Floral Blue Flared Tunic Suit (Party #3)', category: 'Party', color: 'Blue', price: 2190, image: '/images/party_3.png', description: 'Charming white chiffon short tunic with blue floral patterns, featuring matching floral flared sleeves with string detail.' },
            { name: 'Crimson Red Tiered Ruffle Tunic (Party #4)', category: 'Party', color: 'Red', price: 2390, image: '/images/party_4.png', description: 'Striking ruby red chiffon short tunic featuring gorgeous multi-tiered flared sleeves and drawstring wrist details.' },
            { name: 'Lime Green Embroidered Scalloped Co-ord (Party #5)', category: 'Party', color: 'Green', price: 1990, image: '/images/party_5.png', description: 'Chic solid sage/lime green matching shirt and trouser co-ord set featuring delicate white floral embroidery and scalloped border details.' }
        ];

        // Combine custom dresses with fetched ones
        const finalCasualList = customCasualDresses.concat(categories['Casual'].items);
        const finalWeddingList = customWeddingDresses.concat(categories['Wedding'].items);
        const finalPartyList = customPartyDresses.concat(categories['Party'].items);

        let finalDresses = [];
        finalDresses = finalDresses.concat(finalCasualList);
        finalDresses = finalDresses.concat(finalPartyList);
        finalDresses = finalDresses.concat(finalWeddingList);
        finalDresses = finalDresses.concat(categories['Traditional'].items);
        finalDresses = finalDresses.concat(categories['Formal'].items);

        console.log(`Total final dresses gathered: ${finalDresses.length}`);

        // The jewelry list
        const sampleJewellery = [
            { name: 'Assorted Necklace Sets', category: 'Necklace', color: 'Gold/Silver', price: 1699, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0222NK-FRE-GDN-AssortedNecklaceSets_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Gemstone Studs', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0478ER-FRE-001-GemstoneStuds_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Two-tone Earrings', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0417ER-FRE-GDN-Two-toneEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Gemstone Earrings', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0488ER-FRE-227-GemstoneEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Hoops Earrings', category: 'Earrings', color: 'Gold/Silver', price: 899, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0407ER-FRE-GDN-HoopsEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Crisscross Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1299, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0455ER-FRE-GDN-CrisscrossEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Ball Drop Necklace', category: 'Necklace', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0828NK-FRE-GDN-BallDropNecklace_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Floral Pearl Ring', category: 'Ring', color: 'Gold/Silver', price: 1899, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0651RG-FRE-143-FloralPearlRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Floral Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1199, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0532ER-FRE-GDN-FloralEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Tinsel Chain Necklace', category: 'Necklace', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0755NK-FRE-GDN-TinselChainNecklace_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Crisscross Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1299, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0461ER-FRE-638-CrisscrossEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Dual Pendant Necklace', category: 'Necklace', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0796NK-FRE-GDN-DualPendantNecklace_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Petal Drop Earring', category: 'Earrings', color: 'Gold/Silver', price: 1299, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0376ER-FRE-GDN-PetalDropEarring_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Curved Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1199, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0581ER-FRE-638-CurvedEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Pearl Crystal Ring', category: 'Ring', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0734RG-FRE-GDN-PearlCrystalRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Hoops Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1199, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0410ER-FRE-GDN-HoopsEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1599, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0157RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Embellished Ring', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0713RG-FRE-GDN-EmbellishedRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1599, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0124RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0121RG-FRE-SVR-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Open Crystal Ring', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0723RG-FRE-GDN-OpenCrystalRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Ball Drop Earrings', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0493ER-FRE-650BallDropEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0137RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1699, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0117RG-FRE-SVR-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1599, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0163R-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0153RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Woven Textured Ring', category: 'Ring', color: 'Gold/Silver', price: 899, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0718RG-FRE-GDN-WovenTexturedRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0158RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Double Hoop Earrings', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0391ER-FRE-GDN-LayeredEarrings_1_1cf88fa7-6bf8-4619-8ef1-0d3ebda1c607.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0164RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0154RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0161RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Pearl Studs', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0497ER-FRE-GDN-PearlStuds_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Two-tone Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1299, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0449ER-FRE-GDN-Two-toneEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Floral Pearl Studs', category: 'Earrings', color: 'Gold/Silver', price: 1299, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0452ER-FRE-GDN-FloralPearlStuds_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Dangle Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0378ER-FRE-638-DangleEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Pearl Earrings', category: 'Earrings', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0386ER-FRE-GDN-PearlEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Floral Ring', category: 'Ring', color: 'Gold/Silver', price: 1499, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0748RG-FRE-GDN-FloralRing_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Hoop Earrings', category: 'Earrings', color: 'Gold/Silver', price: 999, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0380ER-FRE-GDN-HoopEarrings_1.jpg', description: 'Premium jewellery piece' },
            { name: 'Assorted Rings', category: 'Ring', color: 'Gold/Silver', price: 1399, image: 'https://cdn.shopify.com/s/files/1/2635/3244/files/J0150RG-FRE-GDN-AssortedRings_1.jpg', description: 'Premium jewellery piece' }
        ];

        // Format code for seed.js output
        const dressListStr = JSON.stringify(finalDresses, null, 2);
        const jewelryListStr = JSON.stringify(sampleJewellery, null, 2);

        const seedContent = `const Dress = require('./models/Dress');
const Jewellery = require('./models/Jewellery');
const Outfit = require('./models/Outfit');

const sampleDresses = ${dressListStr};

const sampleJewellery = ${jewelryListStr};

async function seedDatabase() {
  try {
    await Dress.deleteMany({});
    await Jewellery.deleteMany({});
    await Outfit.deleteMany({});
    console.log('Cleared existing data');

    const dresses = await Dress.insertMany(sampleDresses);
    console.log(\`Inserted \${dresses.length} dresses\`);

    const jewellery = await Jewellery.insertMany(sampleJewellery);
    console.log(\`Inserted \${jewellery.length} jewellery items\`);

    const sampleOutfits = [];
    if (dresses.length >= 5 && jewellery.length >= 5) {
      // Setup outfits for each category
      const categories = ['Casual', 'Party', 'Wedding', 'Traditional', 'Formal'];
      for(let i = 0; i < categories.length; i++) {
        const cat = categories[i];
        const catDresses = dresses.filter(d => d.category === cat);
        const catNecklaces = jewellery.filter(j => j.category === 'Necklace');
        const catEarrings = jewellery.filter(j => j.category === 'Earrings');
        
        if (catDresses.length > 0 && catNecklaces.length > 0 && catEarrings.length > 0) {
          sampleOutfits.push({
            name: \`Signature \${cat} Look\`,
            dressId: catDresses[0]._id,
            necklaceId: catNecklaces[i % catNecklaces.length]._id,
            earringId: catEarrings[i % catEarrings.length]._id,
            mood: cat
          });
        }
      }
      await Outfit.insertMany(sampleOutfits);
      console.log(\`Inserted \${sampleOutfits.length} outfits\`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seedDatabase;
`;

        fs.writeFileSync('seed.js', seedContent);
        console.log(`Successfully generated seed.js with ${finalDresses.length} dresses and ${sampleJewellery.length} jewelry items!`);
    } catch(err) {
        console.error('Error in run:', err);
    }
}

run();
