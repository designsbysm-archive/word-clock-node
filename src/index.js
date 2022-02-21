const express = require('express');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let config;
try {
  config = yaml.load(fs.readFileSync('./config.yaml', 'utf8'));
} catch (e) {
  console.error(e);
  process.exit(1);
}

const app = express();

app.use('/angular', express.static(path.join(__dirname, config.client.angular)));
// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(config.api.port, () => {
  console.info('STATIC: listening on %d (%s)', config.api.port, config.api.protocol);
});
