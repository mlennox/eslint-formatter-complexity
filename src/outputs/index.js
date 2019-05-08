const bash = require('./bash');
const json = require('./json');

module.exports = {
  generateReport: complexityResults => {
    json(complexityResults);
    return bash(complexityResults);
  },
};
