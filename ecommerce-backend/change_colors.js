const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('d:/Ecommerce_Angular/E-commerce-using-Angular/src', function(filePath) {
  if (filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.ts')) {
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;
    // Replace black/purple bg
    content = content.replace(/#12121a/g, '#0f172a'); 
    content = content.replace(/rgba\(30,\s*30,\s*47/g, 'rgba(15, 23, 42'); 
    content = content.replace(/rgba\(40,\s*40,\s*60/g, 'rgba(30, 41, 59'); 
    content = content.replace(/rgba\(20,\s*20,\s*30/g, 'rgba(2, 6, 23'); 
    content = content.replace(/#1e1e2f/g, '#1e293b'); 
    // Replace cyan gradient to slate-blue gradient
    content = content.replace(/#4facfe/gi, '#38bdf8'); 
    content = content.replace(/#00f2fe/gi, '#818cf8'); 
    // Replace off-gray to cool-gray
    content = content.replace(/#a0a0b0/g, '#cbd5e1'); 
    if(original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
  }
});
console.log('Update Complete.');
