const { sortAndGroup, getOnlyComplexityResults } = require('./processMessages');
const { checkRules } = require('./rules'); // TODO : pull in from config
const { generateReport } = require('./outputs/index');

module.exports = (results, { rulesMeta }) => {
  if (!checkRules(rulesMeta)) {
    // TODO : improve this message, maybe listing the config complexity rules
    return 'None of the rules we want were used';
  }

  const complexityResults = getOnlyComplexityResults(results);

  if (complexityResults.length === 0) {
    // TODO : improve this message, maybe listing the config complexity rules
    return 'No complexity issues were found';
  }

  return generateReport(sortAndGroup(complexityResults));
};
