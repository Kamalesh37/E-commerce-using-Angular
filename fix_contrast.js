const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('d:/Ecommerce_Angular/E-commerce-using-Angular/src/app', function(filePath) {
  if (filePath.endsWith('.css')) {
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;
    
    // Accents & Gradients
    content = content.replace(/color:\s*#38bdf8/gi, 'color: var(--accent-text)');
    content = content.replace(/color:\s*#818cf8/gi, 'color: var(--accent-text)');
    content = content.replace(/border-color:\s*#38bdf8/gi, 'border-color: var(--accent-text)');
    // Fix gradients
    content = content.replace(/background:\s*linear-gradient\([^;]+\)/gi, 'background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-end) 100%)');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed contrast ' + filePath);
    }
  }
});
