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
    if (!content.includes('CartService')) {
      content = content.replace(/import { Component.*? } from '@angular\/core';/, "$&\nimport { CartService } from '../cart.service';");
      
      // Inject constructor
      if (content.includes('constructor()')) {
          content = content.replace(/constructor\(\) { }/, "constructor(public cartService: CartService) { }");
      } else {
          content = content.replace(/export class [\w]+ implements OnInit {/, "$&\n  constructor(public cartService: CartService) { }\n");
      }

      // Inject addToCart method
      if (!content.includes('addToCart(')) {
          content = content.replace(/ngOnInit\(\): void {.*?}/s, "$&\n\n  addToCart(name: string, price: number) {\n    this.cartService.addToCart({ name, price, quantity: 1 });\n    alert('Added ' + name + ' to your cart!');\n  }");
      }
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Wired TS:', file);
    }
  }

  if (file.endsWith('.html')) {
    // Split by product-card
    const parts = content.split('<div class="product-card">');
    let newContent = parts[0];

    for (let i = 1; i < parts.length; i++) {
      let part = parts[i];
      
      // Extract details
      let brandMatch = part.match(/<h3 class="product-brand">([^<]+)<\/h3>/);
      let descMatch = part.match(/<p class="product-short-des">([^<]+)<\/p>/);
      let priceMatch = part.match(/<span class="price">[^\d]*([\d,]+)<\/span>/); // Note: [^\d]* to clear the ₹ symbol
      
      if (brandMatch && priceMatch) {
         let name = (brandMatch[1].trim() + " " + (descMatch ? descMatch[1].trim() : '')).trim();
         // Escape quotes just in case
         name = name.replace(/'/g, "\\'");
         
         let priceStr = priceMatch[1].replace(/,/g, '');
         let price = parseInt(priceStr, 10);
         
         // Replace overlay content
         part = part.replace(/<div class="overlay">[\s\S]*?<\/div>/, `<div class="overlay"><button class="card-btn" (click)="addToCart('${name}', ${price})">Add to Cart</button></div>`);
      }
      
      newContent += '<div class="product-card">' + part;
    }

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Wired HTML:', file);
    }
  }
});
