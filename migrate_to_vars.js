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
  if (filePath.endsWith('.css') && !filePath.includes('styles.css')) {
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;
    
    // Backgrounds
    content = content.replace(/#f1f5f9/gi, 'var(--bg-primary)'); 
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.7\)/gi, 'var(--glass-bg)'); 
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.6\)/gi, 'var(--glass-bg)'); 
    content = content.replace(/rgba\(241,\s*245,\s*249,\s*0\.8\)/gi, 'var(--hover-glass)'); 
    content = content.replace(/rgba\(255,\s*255,\s*255,\s*0\.5\)/gi, 'var(--input-bg)'); 
    content = content.replace(/#e2e8f0/gi, 'var(--border-strong)'); 

    // Typography
    content = content.replace(/#1e293b/gi, 'var(--text-primary)');
    content = content.replace(/#64748b/gi, 'var(--text-secondary)');

    // Borders/Misc shadows
    content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.05\)/gi, 'var(--border-light)');
    content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.1\)/gi, 'var(--border-strong)');
    content = content.replace(/rgba\(0,\s*0,\s*0,\s*0\.03\)/gi, 'var(--logo-bg)');

    if(original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
  }
});
console.log('Variable Migration Complete.');
