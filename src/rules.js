/**
 * This is hard-coded for the moment but should be provided from configs
 */
const rules = [
  'complexity',
  'max-params',
  'max-statements',
  'max-statements-per-line',
  'max-nested-callbacks',
  'max-depth',
  'max-lines',
];

module.exports = {
  checkRules: rulesMeta => {
    return Object.keys(rulesMeta).filter(rule => rules.indexOf(rule) > -1).length > 0;
  },
  rules,
};
