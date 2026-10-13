const express = require('express');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Ensure required build artifacts exist
const distCssPath = path.join(__dirname, 'dist', 'lazycss.min.css');
const distSpecPath = path.join(__dirname, 'dist', 'lazycss.spec.json');
const distBlueprintPath = path.join(__dirname, 'dist', 'lazycss-blueprint.md');

if (!fs.existsSync(distCssPath) || !fs.existsSync(distSpecPath) || !fs.existsSync(distBlueprintPath)) {
  try {
    console.log('Building Lazy CSS artifacts...');
    execSync('npm run build', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to run initial build:', error);
  }
}

// Serve static assets with html extension support
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Fallback to index.html for root or unknown navigation
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Lazy CSS server listening at http://${HOST}:${PORT}`);
});
