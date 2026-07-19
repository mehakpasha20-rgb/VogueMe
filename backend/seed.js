const Dress = require('./models/Dress');
const Jewellery = require('./models/Jewellery');
const Outfit = require('./models/Outfit');

const sampleDresses = [
  {
    "name": "Sky Blue Printed Salwar Kameez (Dress #6)",
    "category": "Casual",
    "color": "Blue",
    "price": 1490,
    "image": "/images/dress_6.png",
    "description": "Elegant sky blue printed salwar kameez with white trousers. Part of our Casual Shalwar Kameez Collection."
  },
  {
    "name": "Elegant White Kurta Suit (Dress #7)",
    "category": "Casual",
    "color": "White",
    "price": 1290,
    "image": "/images/dress_7.png",
    "description": "Graceful solid white cotton salwar kameez kurta set. Part of our Casual Shalwar Kameez Collection."
  },
  {
    "name": "Blue Printed Cotton Salwar (Dress #8)",
    "category": "Casual",
    "color": "Blue",
    "price": 1690,
    "image": "/images/dress_8.png",
    "description": "Beautiful medium blue printed cotton salwar kameez with white block patterns and matching dupatta. Part of our Casual Shalwar Kameez Collection."
  },
  {
    "name": "Dusty Pink Embroidered Suit (Dress #9)",
    "category": "Casual",
    "color": "Pink",
    "price": 1890,
    "image": "/images/dress_9.png",
    "description": "Luxury dusty pink/mauve heavily embroidered salwar kameez with palazzo pants and matching dupatta. Part of our Casual Shalwar Kameez Collection."
  },
  {
    "name": "Olive Embroidered Cotton Palazzo (Dress #10)",
    "category": "Casual",
    "color": "Green",
    "price": 1590,
    "image": "/images/dress_10.png",
    "description": "Stylish olive green embroidered cotton palazzo suit with matching dupatta. Part of our Casual Shalwar Kameez Collection."
  },
  {
    "name": "Elegant Red Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08567-2500x3750.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zivah Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 3680,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A0925_1.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Brown Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB00838-_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Poise Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2250,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/1L8A4240.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nayeli Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2550,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A1015-2500x3748.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Yanie Kurta Suit",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB06545-_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Liore Kurta Suit",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB06487-_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Brown Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB01354_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Blenche Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2370,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A2087_1.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Red Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB00555-2500x3750.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ayzel Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07074-2500x3750.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Red Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08885-2500x3749.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Printed Jacquard Shirt Kurta Suit",
    "category": "Casual",
    "color": "Black",
    "price": 2350,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25BSP025_1.jpg",
    "description": "Premium Black Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Amaya Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07746-2500x3750.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Printed Fancy Slub Shirt Kurta Suit",
    "category": "Casual",
    "color": "Yellow",
    "price": 2350,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25BSP023_1.jpg",
    "description": "Premium Yellow Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Teal Chiffon Maxi Dress (Party #1)",
    "category": "Party",
    "color": "Blue",
    "price": 2490,
    "image": "/images/party_1.png",
    "description": "Stunning teal blue flowy chiffon floor-length maxi dress with classic sheer sleeves and subtle silver embellishments."
  },
  {
    "name": "Stunning White Tiered Ruffled Gharara (Party #2)",
    "category": "Party",
    "color": "White",
    "price": 2890,
    "image": "/images/party_2.png",
    "description": "Flowy pure white georgette short tunic featuring dramatic multi-tiered ruffled sleeves and a matching flared skirt/gharara."
  },
  {
    "name": "Floral Blue Flared Tunic Suit (Party #3)",
    "category": "Party",
    "color": "Blue",
    "price": 2190,
    "image": "/images/party_3.png",
    "description": "Charming white chiffon short tunic with blue floral patterns, featuring matching floral flared sleeves with string detail."
  },
  {
    "name": "Crimson Red Tiered Ruffle Tunic (Party #4)",
    "category": "Party",
    "color": "Red",
    "price": 2390,
    "image": "/images/party_4.png",
    "description": "Striking ruby red chiffon short tunic featuring gorgeous multi-tiered flared sleeves and drawstring wrist details."
  },
  {
    "name": "Lime Green Embroidered Scalloped Co-ord (Party #5)",
    "category": "Party",
    "color": "Green",
    "price": 1990,
    "image": "/images/party_5.png",
    "description": "Chic solid sage/lime green matching shirt and trouser co-ord set featuring delicate white floral embroidery and scalloped border details."
  },
  {
    "name": "Akbar Aslam Roselle Kurta Suit",
    "category": "Party",
    "color": "Pink",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04293-2500x3751.jpg",
    "description": "Premium Pink Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Parizay Kurta Suit",
    "category": "Party",
    "color": "Brown",
    "price": 2660,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSC06880_1.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Verdelle Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 2300,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1447-2500x3748.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Naranj Kurta Suit",
    "category": "Party",
    "color": "Brown",
    "price": 3390,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSC02362_2.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Avena Kurta Suit",
    "category": "Party",
    "color": "Green",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1350-2500x3749.jpg",
    "description": "Premium Green Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Marigold Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB03153-2500x3750.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Glamour Kurta Suit",
    "category": "Party",
    "color": "Pink",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Glamour-3.png",
    "description": "Premium Pink Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Mehrin Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0627-2500x3748.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Indigo Kurta Suit",
    "category": "Party",
    "color": "Blue",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB02442-2500x3750.jpg",
    "description": "Premium Blue Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Emerald Allure Kurta Suit",
    "category": "Party",
    "color": "Green",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Bottle-Green-5.jpg",
    "description": "Premium Green Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Opulent Echo Kurta Suit",
    "category": "Party",
    "color": "Blue",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Opulent_Echo_1.jpg",
    "description": "Premium Blue Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Mocha Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB03108-2500x3749.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Blue Mirage Kurta Suit",
    "category": "Party",
    "color": "Blue",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Crimson_Dusk_8.webp",
    "description": "Premium Blue Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aster Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08318-2500x3750.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aaralyn Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0833-2500x3748.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Exquisite Grey Bridal Gown (Wedding #1)",
    "category": "Wedding",
    "color": "Silver",
    "price": 3490,
    "image": "/images/wedding_1.png",
    "description": "Heavily embellished mint-grey bridal maxi/gown with intricate silver embroidery and sheer sleeves. Part of our Luxury Bridal Collection."
  },
  {
    "name": "Akbar Aslam Elegant Peach Gharara Suit (Wedding #2)",
    "category": "Wedding",
    "color": "Pink",
    "price": 2990,
    "image": "/images/wedding_2.png",
    "description": "Graceful pastel peach short kurta heavily embroidered with matching gold-chevron gharara pants. Part of our Luxury Bridal Collection."
  },
  {
    "name": "Akbar Aslam Noeva Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 3220,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A1583_1.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Tunio Kurta Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09242_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Surai Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A9940_2.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Exquisite Brown Akbar Aslam Bridal Lehenga Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09131-_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Qamari Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A1172-2500x3748.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Mehrunissa Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0097-2500x3749.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ruvea Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0098_1.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Naazi Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0692-2500x3749.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nayara Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2550,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0770-2500x3749.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Dileo Kurta Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08985_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Exquisite Brown Akbar Aslam Bridal Lehenga Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09389_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Emarelle Kurta Suit",
    "category": "Wedding",
    "color": "Pink",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSF0210_1.jpg",
    "description": "Premium Pink Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Celeste Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2520,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1965.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Raniyat Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 1800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2656.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Inaya Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2560,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1135_1.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Gulnaz Kurta Suit",
    "category": "Wedding",
    "color": "Pink",
    "price": 1700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2367.jpg",
    "description": "Premium Pink Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nivelle Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0003_1.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Tenebris Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2250,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/1L8A3260.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zayna Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A1436-2500x3749.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Cielle Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 3040,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A6947_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ravina Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A9970-2500x3748.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic White Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07342-2500x3750.jpg",
    "description": "Premium White Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Samara Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2550,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A9857-2500x3748.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Citrus Bloom Kurta Suit",
    "category": "Traditional",
    "color": "Orange",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Citrus-Bloom-6.jpg",
    "description": "Premium Orange Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Red Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Red",
    "price": 1250,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Iris_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Red Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A9612_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Brown Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09530_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "LP22-08 | Luxury Pret Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4100,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/LP-324-1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Midnight Bloom Kurta Suit",
    "category": "Traditional",
    "color": "Blue",
    "price": 4400,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Midnight_Bloom_4.webp",
    "description": "Premium Blue Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Elarin Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A1811_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Azalea Kurta Suit",
    "category": "Traditional",
    "color": "Green",
    "price": 2980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0805-2500x3749.jpg",
    "description": "Premium Green Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Dewdrop Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Dewdrop_5.webp",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Neon Nova Kurta Suit",
    "category": "Traditional",
    "color": "Pink",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Neon-Nova-1.jpg",
    "description": "Premium Pink Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Marigold Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB06764-2500x3749.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Brown Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08442_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aveline Kurta Suit",
    "category": "Traditional",
    "color": "Orange",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0158-2500x3749.jpg",
    "description": "Premium Orange Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Sandstone Serenity Kurta Suit",
    "category": "Traditional",
    "color": "Brown",
    "price": 1400,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Beige-1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Liora Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07279-2500x3750.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Muzlin Linen Suit",
    "category": "Formal",
    "color": "Purple",
    "price": 4100,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25MUZ017B_1.jpg",
    "description": "Premium Purple Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zimalia Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0446.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Seraya Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1818_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Sophisticated Red Luxury Silk Kurta Set",
    "category": "Formal",
    "color": "Red",
    "price": 2160,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0834.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aurea Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1483-2500x3748.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Caelis Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0677_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Rajbano Kurta Suit",
    "category": "Formal",
    "color": "Pink",
    "price": 1900,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A3957.jpg",
    "description": "Premium Pink Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ardyn Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0041_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Dynara Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2160,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2033.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ornella Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1052.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Dilafroz Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 1950,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A3650.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Solae Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2100,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0341.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zarnigar Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 1900,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A4156.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aurex Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0598_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zarin Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2280,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1359_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Elisea Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1656_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zivara Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0536_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Poise Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2240,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1927_4.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Siyana Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0205_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Printed Linen Suit",
    "category": "Formal",
    "color": "Purple",
    "price": 3850,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/H255-001B-3CY_b1e2d3a1-1c6d-45e2-bae2-3d1d2a0705e8.jpg",
    "description": "Premium Purple Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  }
];

const sampleJewellery = [
  {
    "name": "Assorted Necklace Sets",
    "category": "Necklace",
    "color": "Gold/Silver",
    "price": 1699,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0222NK-FRE-GDN-AssortedNecklaceSets_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Gemstone Studs",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0478ER-FRE-001-GemstoneStuds_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Two-tone Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0417ER-FRE-GDN-Two-toneEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Gemstone Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0488ER-FRE-227-GemstoneEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Hoops Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 899,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0407ER-FRE-GDN-HoopsEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Crisscross Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1299,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0455ER-FRE-GDN-CrisscrossEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Ball Drop Necklace",
    "category": "Necklace",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0828NK-FRE-GDN-BallDropNecklace_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Floral Pearl Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1899,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0651RG-FRE-143-FloralPearlRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Floral Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1199,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0532ER-FRE-GDN-FloralEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Tinsel Chain Necklace",
    "category": "Necklace",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0755NK-FRE-GDN-TinselChainNecklace_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Crisscross Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1299,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0461ER-FRE-638-CrisscrossEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Dual Pendant Necklace",
    "category": "Necklace",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0796NK-FRE-GDN-DualPendantNecklace_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Petal Drop Earring",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1299,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0376ER-FRE-GDN-PetalDropEarring_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Curved Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1199,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0581ER-FRE-638-CurvedEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Pearl Crystal Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0734RG-FRE-GDN-PearlCrystalRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Hoops Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1199,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0410ER-FRE-GDN-HoopsEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1599,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0157RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Embellished Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0713RG-FRE-GDN-EmbellishedRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1599,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0124RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0121RG-FRE-SVR-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Open Crystal Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0723RG-FRE-GDN-OpenCrystalRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Ball Drop Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0493ER-FRE-650BallDropEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0137RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1699,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0117RG-FRE-SVR-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1599,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0163R-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0153RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Woven Textured Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 899,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0718RG-FRE-GDN-WovenTexturedRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0158RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Double Hoop Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0391ER-FRE-GDN-LayeredEarrings_1_1cf88fa7-6bf8-4619-8ef1-0d3ebda1c607.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0164RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0154RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0161RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Pearl Studs",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0497ER-FRE-GDN-PearlStuds_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Two-tone Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1299,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0449ER-FRE-GDN-Two-toneEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Floral Pearl Studs",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1299,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0452ER-FRE-GDN-FloralPearlStuds_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Dangle Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0378ER-FRE-638-DangleEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Pearl Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0386ER-FRE-GDN-PearlEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Floral Ring",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1499,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0748RG-FRE-GDN-FloralRing_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Hoop Earrings",
    "category": "Earrings",
    "color": "Gold/Silver",
    "price": 999,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0380ER-FRE-GDN-HoopEarrings_1.jpg",
    "description": "Premium jewellery piece"
  },
  {
    "name": "Assorted Rings",
    "category": "Ring",
    "color": "Gold/Silver",
    "price": 1399,
    "image": "https://cdn.shopify.com/s/files/1/2635/3244/files/J0150RG-FRE-GDN-AssortedRings_1.jpg",
    "description": "Premium jewellery piece"
  }
];

async function seedDatabase() {
  try {
    await Dress.deleteMany({});
    await Jewellery.deleteMany({});
    await Outfit.deleteMany({});
    console.log('Cleared existing data');

    const dresses = await Dress.insertMany(sampleDresses);
    console.log(`Inserted ${dresses.length} dresses`);

    const jewellery = await Jewellery.insertMany(sampleJewellery);
    console.log(`Inserted ${jewellery.length} jewellery items`);

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
            name: `Signature ${cat} Look`,
            dressId: catDresses[0]._id,
            necklaceId: catNecklaces[i % catNecklaces.length]._id,
            earringId: catEarrings[i % catEarrings.length]._id,
            mood: cat
          });
        }
      }
      await Outfit.insertMany(sampleOutfits);
      console.log(`Inserted ${sampleOutfits.length} outfits`);
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = seedDatabase;
