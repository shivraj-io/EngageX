const ImageKit = require('imagekit');
const config = require('./env');

// Initialize ImageKit instance
let imagekit = null;

if (config.imagekit.publicKey && config.imagekit.privateKey && config.imagekit.urlEndpoint) {
  imagekit = new ImageKit({
    publicKey: config.imagekit.publicKey,
    privateKey: config.imagekit.privateKey,
    urlEndpoint: config.imagekit.urlEndpoint
  });
  
  console.log('✅ ImageKit configured');
} else {
  console.warn('⚠️  ImageKit credentials not found. Image upload will not work.');
}

module.exports = imagekit;
