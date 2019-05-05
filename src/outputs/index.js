const bash = require('./bash');
const json = require('./json');

module.exports = {
  generateReport: (complexityResults, options) => {
    const { format } = options || {};
    switch (format) {
      case 'json':
        return json(complexityResults);
      case 'bash':
      default:
        return bash(complexityResults);
    }
  },
};
