const fs = require('fs');
const path = require('path');

function cleanFile(srcPath, destPath) {
  const fileContent = fs.readFileSync(srcPath, 'utf8');
  
  // Find the separator "---"
  const separator = '---\n';
  const sepIndex = fileContent.indexOf(separator);
  
  if (sepIndex === -1) {
    console.error(`Separator not found in ${srcPath}`);
    return;
  }
  
  // Extract everything after "---"
  let content = fileContent.substring(sepIndex + separator.length);
  
  // Trim any leading/trailing newlines
  content = content.trim();
  
  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`Extracted and wrote: ${destPath} (${content.length} chars)`);
}

const cssSrc = 'C:\\Users\\USER\\.gemini\\antigravity-cli\\brain\\fcf0e45b-1a5f-4c8c-99ef-03f66053f160\\.system_generated\\steps\\10\\content.md';
const cssDest = 'C:\\Users\\USER\\wedding-invitation\\style1.css';

const jsSrc = 'C:\\Users\\USER\\.gemini\\antigravity-cli\\brain\\fcf0e45b-1a5f-4c8c-99ef-03f66053f160\\.system_generated\\steps\\12\\content.md';
const jsDest = 'C:\\Users\\USER\\wedding-invitation\\script3.js';

try {
  cleanFile(cssSrc, cssDest);
  cleanFile(jsSrc, jsDest);
  console.log('Extraction completed successfully!');
} catch (error) {
  console.error('Error extracting files:', error);
}
