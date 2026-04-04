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
    
    // Convert hardcoded invisible/white text to variables so they switch dynamically
    content = content.replace(/color:\s*#ffffff;/gi, 'color: var(--text-primary);');
    content = content.replace(/color:\s*#fff;/gi, 'color: var(--text-primary);');
    content = content.replace(/color:\s*white;/gi, 'color: var(--text-primary);');
    content = content.replace(/color:\s*#d1d2d2;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#a0a0b0;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*#5c666b;/gi, 'color: var(--text-secondary);');
    content = content.replace(/color:\s*var\(--text-primary\)fff;/gi, 'color: var(--text-primary);');

    // Ensure buttons remain white text
    content = content.replace(/(\.card-btn[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');
    content = content.replace(/(\.apply-btn[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');
    content = content.replace(/(\.submit-btn[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');
    content = content.replace(/(\.cta-btn[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');
    content = content.replace(/(\.discount-tag[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');
    content = content.replace(/(\.badge[\s\S]*?)color:\s*var\(--text-primary\);/gi, '$1color: #ffffff;');

    if (original !== content) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed invisible text in ' + filePath);
    }
  }
});
