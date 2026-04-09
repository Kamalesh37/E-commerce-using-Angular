const fs = require('fs');
const path = require('path');

const targets = [
  'src/app/child1/child1.component.html',
  'src/app/child1/child1.component.ts',
  'src/app/child2/child2.component.html',
  'src/app/child2/child2.component.ts',
  'src/app/television/television.component.html',
  'src/app/television/television.component.ts',
  'src/app/contact/contact.component.html',
  'src/app/contact/contact.component.ts'
];

targets.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  if (file.endsWith('.ts')) {
    // Modify addToCart signature
    if (content.includes('addToCart(name: string, price: number)')) {
      content = content.replace(/addToCart\(name: string, price: number\) {/g, "addToCart(name: string, price: number, image?: string) {");
      content = content.replace(/this\.cartService\.addToCart\(\{ name, price, quantity: 1 \}\);/g, "this.cartService.addToCart({ name, price, image });");
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated TS signature:', file);
    }
  }

  if (file.endsWith('.html')) {
    const parts = content.split('<div class="product-card">');
    let newContent = parts[0];

    for (let i = 1; i < parts.length; i++) {
        let part = parts[i];
        
        let imgMatch = part.match(/<img[^>]+src="([^"]+)"/i);
        let brandMatch = part.match(/<h3 class="product-brand">([^<]+)<\/h3>/);
        let descMatch = part.match(/<p class="product-short-des">([^<]+)<\/p>/);
        let priceMatch = part.match(/<span class="price">[^\d]*([\d,]+)<\/span>/); 
        
        if (brandMatch && imgMatch) { // We use imgMatch inside condition if price doesn't exist then it might just have an Add To Cart without price (like featured)
            let imageStr = imgMatch[1];
            let name = (brandMatch[1].trim() + " " + (descMatch ? descMatch[1].trim() : '')).trim().replace(/'/g, "\\'");
            
            let price = 0;
            if (priceMatch) {
                let priceStr = priceMatch[1].replace(/,/g, '');
                price = parseInt(priceStr, 10);
            }
            
            // Replace the (click)="addToCart(..., ...)" with one carrying the image
            // Note: we can just rip out the entire button and replace it
            part = part.replace(/<button class="card-btn"[^>]*>Add to Cart<\/button>/, `<button class="card-btn" (click)="addToCart('${name}', ${price}, '${imageStr}')">Add to Cart</button>`);
        }
        
        newContent += '<div class="product-card">' + part;
    }

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated HTML:', file);
    }
  }
});
