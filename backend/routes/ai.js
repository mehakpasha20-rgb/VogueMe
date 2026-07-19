const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key'
});

// Helper function for local fashion advice
function getLocalFashionAdvice(message) {
  const msg = message.toLowerCase();
  
  // Red Dress Matching
  if (msg.includes('red') && (msg.includes('dress') || msg.includes('gown') || msg.includes('saree') || msg.includes('outfit') || msg.includes('wear') || msg.includes('match') || msg.includes('jewel') || msg.includes('colour') || msg.includes('color'))) {
    return `A red dress is a bold and classic statement! Here are the best jewellery color pairings:

1. **Timeless Gold**: Yellow gold jewellery adds a warm, luxurious glow. Ideal for traditional or formal events. Try a classic gold necklace set or statement gold hoop earrings (like our **Hoops Earrings**).
2. **Sleek Silver & Platinum**: Silver, white gold, or platinum creates a clean, high-contrast, modern look that cools down the intensity of the red.
3. **Dramatic Black**: Black onyx or obsidian jewellery gives a sophisticated, edgy, and modern look.
4. **Emerald Green**: For a high-fashion, complementary color block contrast, emerald green stones look absolutely stunning against red.

**Styling Tip:** Keep it balanced! If your red dress has a busy neckline, opt for statement earrings (like our **Hoops Earrings** or **Double Hoop Earrings**) and skip the necklace.`;
  }
  
  // Black Dress Matching
  if (msg.includes('black') && (msg.includes('dress') || msg.includes('gown') || msg.includes('saree') || msg.includes('outfit') || msg.includes('wear') || msg.includes('match') || msg.includes('jewel') || msg.includes('colour') || msg.includes('color'))) {
    return `A black dress (LBD) or a formal black gown is the ultimate canvas for jewellery! Here's how to style it:

1. **Classic Pearls**: Pure white pearls (like our **Floral Pearl Ring** or a classic pearl necklace) offer unmatched, timeless sophistication.
2. **Shimmering Crystals & Diamonds**: Clear crystal or diamond pieces reflect light beautifully against a dark backdrop, giving you a sparkling, glamorous look.
3. **Rich Gold**: Bold, polished yellow gold jewelry brings warmth and a high-end feel.
4. **Pop of Color**: Make a statement by adding a single bold color—such as ruby red, emerald green, or sapphire blue gemstone earrings.

**Styling Tip:** With a black dress, you can go bold! Try pairing it with a statement piece like our **Assorted Necklace Sets** or **Tinsel Chain Necklace**.`;
  }

  // White Dress Matching
  if (msg.includes('white') && (msg.includes('dress') || msg.includes('gown') || msg.includes('saree') || msg.includes('outfit') || msg.includes('wear') || msg.includes('match') || msg.includes('jewel') || msg.includes('colour') || msg.includes('color'))) {
    return `White and ivory dresses are clean, fresh, and look great with almost any jewellery. Here are the top recommendations:

1. **Rose Gold**: Adds a soft, romantic, and feminine touch that blends beautifully with white.
2. **Vibrant Gemstones**: Colorful stones (turquoise, amethyst, emerald) add a fun pop of personality and color to a monochrome look.
3. **Silver & Platinum**: Keeps the look crisp, clean, and ultra-modern.
4. **Yellow Gold**: Provides a striking, sun-kissed contrast against stark white.

**Styling Tip:** Silver or rose gold rings (like our **Pearl Crystal Ring** or **Open Crystal Ring**) add subtle elegance without overpowering a clean white outfit.`;
  }

  // Blue/Navy Dress Matching
  if ((msg.includes('blue') || msg.includes('navy')) && (msg.includes('dress') || msg.includes('gown') || msg.includes('saree') || msg.includes('outfit') || msg.includes('wear') || msg.includes('match') || msg.includes('jewel') || msg.includes('colour') || msg.includes('color'))) {
    return `Blue is a versatile color that ranges from fresh royal blue to deep navy. Here is the perfect jewellery match:

1. **Cool Silver**: Silver and white gold are the absolute best match for cool-toned blues, creating a sleek and cohesive aesthetic.
2. **Warm Gold**: Yellow gold creates a rich, royal contrast, especially with dark navy blue.
3. **Pearls**: White pearls against navy blue is a classic maritime-inspired look that screams elegance.

**Styling Tip:** A delicate necklace like our **Dual Pendant Necklace** or a pair of **Curved Earrings** works wonders with blue necklines.`;
  }

  // Green Dress Matching
  if (msg.includes('green') && (msg.includes('dress') || msg.includes('gown') || msg.includes('saree') || msg.includes('outfit') || msg.includes('wear') || msg.includes('match') || msg.includes('jewel') || msg.includes('colour') || msg.includes('color'))) {
    return `Green is a lush, vibrant color. Here are the top jewellery selections:

1. **Yellow Gold**: The absolute champion for green. Gold highlights the warm undertones of olive, emerald, and forest green.
2. **Silver**: Works beautifully with cool-toned mint or sage greens.
3. **Ruby Red / Pink Stones**: Creates a bold, complementary high-contrast statement.

**Styling Tip:** Try simple gold accents like our **Woven Textured Ring** or **Floral Earrings** to complement the organic tones of green.`;
  }

  // Wedding Outfit
  if (msg.includes('wedding') || msg.includes('marriage') || msg.includes('bridal') || msg.includes('bride')) {
    return `For weddings, you want styling that is elegant, celebratory, and memorable!

- **For the Bride/Traditional wear**: A statement choker or heavy necklace set (like our **Assorted Necklace Sets**) is key. Gold or Kundan works best for traditional red/maroon lehengas or sarees.
- **For the Guests**: Opt for elegant and slightly lighter styles. A sophisticated **Tinsel Chain Necklace** paired with **Petal Drop Earrings** strikes the perfect balance of festive and respectful.

**Styling Tip:** Ensure your jewellery matches the embroidery/embellishments on your outfit (e.g., gold embroidery calls for gold-toned jewellery).`;
  }

  // Party Outfit
  if (msg.includes('party') || msg.includes('cocktail') || msg.includes('club') || msg.includes('night out') || msg.includes('event')) {
    return `Party fashion is all about standing out and having fun! Here's how to accessorize:

- **Statement Earrings**: If your outfit is simple, go big on the ears. Try our **Double Hoop Earrings** or **Ball Drop Earrings**.
- **Layered Rings**: Stacked rings like our **Assorted Rings** add a cool, trendy vibe to any party look.
- **Shine & Metallic**: Metallic jewelry (gold or silver) catches the dancefloor lights beautifully. Keep it modern and bold!`;
  }

  // General Earring / Neckline match
  if (msg.includes('neckline') || msg.includes('neck') || msg.includes('earring') || msg.includes('necklace') || msg.includes('ring') || msg.includes('suit') || msg.includes('match')) {
    return `Matching jewellery to your neckline is the secret to a polished outfit:

- **V-Neck**: A pendant necklace (like our **Dual Pendant Necklace**) that mirrors the V-shape.
- **Sweetheart / Strapless**: A collar or choker necklace, or no necklace at all paired with dramatic drop earrings (like our **Petal Drop Earring**).
- **High Neck / Halter**: Skip the necklace! Focus on gorgeous statement earrings (like **Crisscross Earrings**) and a stacked set of rings.
- **Off-the-shoulder**: Chokers or short necklaces look wonderful, leaving the collarbone elegant and clean.`;
  }

  // Fallback
  return `Hello! I am your VogueMe AI Fashion Assistant. I can help you find the perfect matching jewelry for your outfit, suggest styles, and coordinate colors.

Could you tell me the color, neckline, or occasion of the outfit you are planning to wear? For example, ask me:
- *"What matches a red dress?"*
- *"Suggest a wedding outfit."*
- *"What jewellery matches a black dress?"*`;
}

// AI Fashion Assistant
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Check if key is a placeholder or not provided
    const apiKey = process.env.OPENAI_API_KEY;
    const isPlaceholder = !apiKey || 
                          apiKey.includes('your_openai_api_key_here') || 
                          apiKey.trim() === '';

    if (isPlaceholder) {
      console.log('OpenAI API key is missing or a placeholder. Using local AI engine.');
      return res.json({ response: getLocalFashionAdvice(message) });
    }

    const systemPrompt = `You are a fashion assistant for VogueMe, a fashion e-commerce platform. 
    You help users with:
    - Finding matching jewellery for dresses
    - Suggesting outfits for different occasions (Casual, Party, Wedding, Formal, Traditional)
    - Providing fashion advice
    - Recommending color combinations
    
    Keep responses friendly, helpful, and concise. Focus on fashion advice related to dresses and jewellery.
    
    IMPORTANT FORMATTING RULE: Do NOT use any asterisks (*) or double-asterisks (**) in your responses for list bullet points, headers, or text bolding. Emphasize words or section headers using UPPERCASE text instead (e.g. "STYLING TIP:"). Never print asterisks in your responses.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 500
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI Error:', error);
    // Fall back to local fashion engine on OpenAI error
    console.log('Falling back to local fashion engine.');
    res.json({ response: getLocalFashionAdvice(req.body.message) });
  }
});

module.exports = router;
