// TODO : pull in from config
const rules = require('rules');

/**
 * Checks if the eslint rules that were run against the codebase 
 */
module.exports = (rulesMeta) => {
    return rulesMeta
        .filter(rule => rules.indexOf(rule) > -1)
        .length > 0;
}