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
    // Backgrounds
    content = content.replace(/#0f172a/gi, '#f1f5f9'); // Global bg
    content = content.replace(/rgba\(15,\s*23,\s*42/gi, 'rgba(255, 255, 255'); // glass cards
    content = content.replace(/rgba\(30,\s*41,\s*59/gi, 'rgba(241, 245, 249'); // hover glass
    content = content.replace(/rgba\(2,\s*6,\s*23/gi, 'rgba(255, 255, 255'); // active/inputs
    content = content.replace(/#1e293b/gi, '#e2e8f0'); // borders/secondary

    // Typography
    content = content.replace(/color:\s*#fff/gi, 'color: #1e293b');
    content = content.replace(/color:\s*#ffffff/gi, 'color: #1e293b');
    content = content.replace(/color:\s*#f8fafc/gi, 'color: #1e293b');
    content = content.replace(/color:\s*#cbd5e1/gi, 'color: #64748b');

    // Protect buttons specific to this app
    content = content.replace(/(\.card-btn[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');
    content = content.replace(/(\.apply-btn[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');
    content = content.replace(/(\.submit-btn[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');
    content = content.replace(/(\.grid-btn\.active[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');
    content = content.replace(/(\.cta-btn[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');
    content = content.replace(/(\.discount-tag[\s\S]*?)color:\s*#1e293b/gi, '$1color: #ffffff');

    // Fix border colors from white-transparent to black-transparent for light mode
    content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.05\)/gi, 'border: 1px solid rgba(0, 0, 0, 0.05)');
    content = content.replace(/border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.1\)/gi, 'border-color: rgba(0, 0, 0, 0.1)');
    content = content.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.1\)/gi, 'border: 1px solid rgba(0, 0, 0, 0.1)');
    content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.05\)/gi, 'background: rgba(0, 0, 0, 0.03)');

    if(original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated ' + filePath);
    }
  }
});
console.log('Light Mode Switch Complete.');
