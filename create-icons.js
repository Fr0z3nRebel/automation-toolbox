// Simple script to create minimal PNG icons
const fs = require('fs');
const path = require('path');

// Minimal valid 1x1 PNG (transparent)
// This is a base64-encoded minimal PNG
const minimalPNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const sizes = [16, 48, 128, 512];
const iconsDir = path.join(__dirname, 'icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// For each size, create a placeholder
sizes.forEach(size => {
  const filePath = path.join(iconsDir, `icon${size}.png`);
  // Write a minimal valid PNG (will be 1x1, but Chrome will accept it)
  // User should replace with proper icons
  fs.writeFileSync(filePath, minimalPNG);
  console.log(`Created placeholder: icon${size}.png`);
});

console.log('\nNote: These are minimal placeholder icons.');
console.log('Please replace them with proper 16x16, 48x48, 128x128, and 512x512 PNG icons.');
