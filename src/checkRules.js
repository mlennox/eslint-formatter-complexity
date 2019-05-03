// TODO : pull in from config
const rules = require('./rules').rules;

/**
 * Checks if the eslint rules that were run against the codebase
 */
module.exports = rulesMeta => {
  return Object.keys(rulesMeta).filter(rule => rules.indexOf(rule) > -1).length > 0;
};
