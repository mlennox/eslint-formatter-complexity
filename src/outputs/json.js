const fs = require('fs');

const target = {
  directory: './complexity/',
  file: 'report.json',
};

module.exports = complexityResults => {
  try {
    if (!fs.existsSync(target.directory)) {
      fs.mkdirSync(target.directory);
    }
    fs.writeFileSync(`${target.directory}/${target.file}`, JSON.stringify(complexityResults));
  } catch (error) {
    console.error(error);
  }
};
