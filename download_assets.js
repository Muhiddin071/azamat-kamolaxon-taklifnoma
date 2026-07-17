const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = [
  'lock.webp',
  'lock1.webp',
  'hero.webp',
  'hero1.webp',
  'fon22.webp',
  'fon2g.webp',
  't1.webp',
  't2.webp',
  't3.webp',
  't4.webp',
  'wed1.webp',
  'wed2.webp',
  'preview.webp',
  'favicon.png'
];

const baseUrl = 'https://momento.uz/wedding/24/';
const musicUrl = 'https://momento.uz/music/music2.mp3';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Starting asset download...');
  
  // Ensure music folder exists
  const musicDir = path.join(__dirname, 'music');
  if (!fs.existsSync(musicDir)) {
    fs.mkdirSync(musicDir);
  }

  // Download images
  for (const asset of assets) {
    const url = baseUrl + asset;
    const dest = path.join(__dirname, asset);
    console.log(`Downloading ${url} -> ${dest}`);
    try {
      await downloadFile(url, dest);
      console.log(`Downloaded ${asset}`);
    } catch (err) {
      console.error(`Error downloading ${asset}:`, err.message);
    }
  }

  // Download music
  const musicDest = path.join(musicDir, 'music2.mp3');
  console.log(`Downloading music: ${musicUrl} -> ${musicDest}`);
  try {
    await downloadFile(musicUrl, musicDest);
    console.log('Downloaded music2.mp3');
  } catch (err) {
    console.error('Error downloading music:', err.message);
  }

  console.log('All downloads completed!');
}

main();
