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
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08885-2500x3749.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
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
    "name": "Akbar Aslam Veloure Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2250,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/1L8A4364.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Linea Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A1277_4.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Odette Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2660,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A7402_1_807fd258-22e4-49b8-af6b-a901a70ff3c6.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Brown Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09269_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zarel Kurta Suit",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09342_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elegant Red Printed Lawn Shalwar Kameez",
    "category": "Casual",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A9612_1.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
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
    "name": "Akbar Aslam Cazel Kurta Suit",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08469_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nixon Kurta Suit",
    "category": "Casual",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB00917-_1.jpg",
    "description": "Premium Brown Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Willow Kurta Suit",
    "category": "Casual",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB06663-2500x3750.jpg",
    "description": "Premium White Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Eclipse Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB00311-2500x3750.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Yasmina Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A1089-2500x3749.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ravina Kurta Suit",
    "category": "Casual",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A9970-2500x3748.jpg",
    "description": "Premium Red Women\\'s Casual Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Friya Kurta Suit",
    "category": "Party",
    "color": "Brown",
    "price": 3390,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSC06790_1.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Embroidered Sheesha Silk Shirt+ Trouser Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 1316,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25FOR028P2T-1-Edited_2a969a85-c5ae-4d76-860b-b3c6fa882afb.png",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "NATH AF Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 1250,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/NATH-AF-04-2.png",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Dandelion Dream Kurta Suit",
    "category": "Party",
    "color": "Yellow",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Dandelion-Dream-6.jpg",
    "description": "Premium Yellow Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Sapphire Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04964-2500x3750.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Dewdrop Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 4500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Dewdrop_5.webp",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Moonlit Whisper Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Moonlit_Whisper_8.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Lumina Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0579-2500x3749.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Citrus Bloom Kurta Suit",
    "category": "Party",
    "color": "Orange",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Citrus-Bloom-6.jpg",
    "description": "Premium Orange Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Mevra Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 3220,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A9729_1.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Ruqai Kurta Suit",
    "category": "Party",
    "color": "Brown",
    "price": 2720,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSC02551_1.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Elarin Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A1811_1.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nixia Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09015-2500x3750.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stunning Brown Festive Chiffon Dress",
    "category": "Party",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08011-_1.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Naira Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07957-2500x3749.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Digital Printed Shirt Kurta Suit",
    "category": "Party",
    "color": "Green",
    "price": 3950,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/SS25STP650_1.jpg",
    "description": "Premium Green Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Eveline Kurta Suit",
    "category": "Party",
    "color": "Red",
    "price": 3040,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A8220_2.jpg",
    "description": "Premium Red Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Briar Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04999-2500x3749.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Lynie Kurta Suit",
    "category": "Party",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09489-2500x3750.jpg",
    "description": "Premium White Women\\'s Party Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Elysian Kurta Suit",
    "category": "Party",
    "color": "Brown",
    "price": 4590,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/1O9A4313.jpg",
    "description": "Premium Brown Women\\'s Party Suit - Authentic Pakistani Designer Wear."
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
    "name": "Akbar Aslam Azalea Kurta Suit",
    "category": "Wedding",
    "color": "Yellow",
    "price": 2980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0805-2500x3749.jpg",
    "description": "Premium Yellow Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
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
    "name": "Exquisite Red Akbar Aslam Bridal Lehenga Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08567-2500x3750.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Sapphire Kurta Suit",
    "category": "Wedding",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07660-2500x3750.jpg",
    "description": "Premium White Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Parizay Kurta Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 2660,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/DSC06880_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Kaelia Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0897-2500x3749.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Exquisite Red Akbar Aslam Bridal Lehenga Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08132-2500x3750.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Lotus Kurta Suit",
    "category": "Wedding",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04343-2500x3749.jpg",
    "description": "Premium White Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Roselle Kurta Suit",
    "category": "Wedding",
    "color": "Pink",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04293-2500x3751.jpg",
    "description": "Premium Pink Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
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
    "name": "Akbar Aslam Armina Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 2550,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0466-2500x3749.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Canary Kurta Suit",
    "category": "Wedding",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB00598-2500x3750.jpg",
    "description": "Premium Red Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Wildflower Kurta Suit",
    "category": "Wedding",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB02858-2500x3750.jpg",
    "description": "Premium White Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Zarielle Kurta Suit",
    "category": "Wedding",
    "color": "Black",
    "price": 2980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1206-2500x3749.jpg",
    "description": "Premium Black Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Exquisite Brown Akbar Aslam Bridal Lehenga Suit",
    "category": "Wedding",
    "color": "Brown",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09817-_1.jpg",
    "description": "Premium Brown Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Coral Kurta Suit",
    "category": "Wedding",
    "color": "Pink",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08182-2500x3750.jpg",
    "description": "Premium Pink Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Poppy Kurta Suit",
    "category": "Wedding",
    "color": "White",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB04692-2500x3750.jpg",
    "description": "Premium White Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Manrch Kurta Suit",
    "category": "Wedding",
    "color": "White",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08667-2500x3750.jpg",
    "description": "Premium White Women\\'s Wedding Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Rivah Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2990,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A0628_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Elara Bridal Ensemble Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4000,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Elara_Bridal_Ensemble_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Surai Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A9940_2.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Rosette Kurta Suit",
    "category": "Traditional",
    "color": "Pink",
    "price": 3500,
    "image": "https://cdn.shopify.com/s/files/1/0717/3934/3066/files/Rosette_8.webp",
    "description": "Premium Pink Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Marjaan Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A0551-2500x3749.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Nurel Kurta Suit",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08540_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Brown Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB01354_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Printed Khaddar Shirt+ Dupatta Kurta Suit",
    "category": "Traditional",
    "color": "Green",
    "price": 3350,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25MHY510BP2D_1.jpg",
    "description": "Premium Green Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Brown Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09306-_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Indigo Kurta Suit",
    "category": "Traditional",
    "color": "Blue",
    "price": 4450,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB02442-2500x3750.jpg",
    "description": "Premium Blue Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Aveline Kurta Suit",
    "category": "Traditional",
    "color": "Black",
    "price": 3980,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0158-2500x3749.jpg",
    "description": "Premium Black Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Evania Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2660,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A7191_1.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Dileo Kurta Suit",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB08985_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Porcelain Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2250,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/1L8A3102.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Amaya Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB07746-2500x3750.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Liora Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 4490,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB01122-2500x3749.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Mehrnaz Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/7I0A1377-2500x3748.jpg",
    "description": "Premium Red Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Classic Brown Embroidered Traditional Shalwar Kameez",
    "category": "Traditional",
    "color": "Brown",
    "price": 4800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/MTB09612_1.jpg",
    "description": "Premium Brown Women\\'s Traditional Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Petalia Kurta Suit",
    "category": "Traditional",
    "color": "Red",
    "price": 2660,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/35A8469_1.jpg",
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
    "name": "Akbar Aslam Zivara Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0536_1.jpg",
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
    "name": "Akbar Aslam Ardyn Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0041_1.jpg",
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
    "name": "Akbar Aslam Raniyat Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 1800,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2656.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Allure Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2400,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0888.jpg",
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
    "name": "Akbar Aslam Solae Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2100,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0341.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Stitched Muzlin Khaddar Suit",
    "category": "Formal",
    "color": "Red",
    "price": 3600,
    "image": "https://cdn.shopify.com/s/files/1/0740/1753/8280/files/FW25MUZ007B_1.jpg",
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
    "name": "Akbar Aslam Nivelle Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A0003_1.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
  },
  {
    "name": "Akbar Aslam Sylra Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1256_5.jpg",
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
    "name": "Akbar Aslam Gulnaz Kurta Suit",
    "category": "Formal",
    "color": "Pink",
    "price": 1700,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2367.jpg",
    "description": "Premium Pink Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
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
    "name": "Akbar Aslam Dynara Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2160,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A2033.jpg",
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
    "name": "Akbar Aslam Avenor Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 4290,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1788_4.jpg",
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
    "name": "Akbar Aslam Celeste Kurta Suit",
    "category": "Formal",
    "color": "Red",
    "price": 2520,
    "image": "https://cdn.shopify.com/s/files/1/0316/1712/2442/files/2C5A1965.jpg",
    "description": "Premium Red Women\\'s Formal Suit - Authentic Pakistani Designer Wear."
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
