const col = require('./console.colours');
const errorSorter = require('./errorSorter');
const groupMessages = require('./groupMessages');
const checkRules = require('./checkRules');
const rules = require('./rules').rules; // TODO : pull in from config

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

  return collectReport(complexityResults.sort(errorSorter));
};

/**
 * Filter out files and messages that are not a result of the configured complexity rules
 * @param {*} results
 */
const getOnlyComplexityResults = results => {
  return (
    results
      // remove any results that reported no issues
      .filter(result => result.errorCount > 0 || result.warningCount > 0)
      .map(result => {
        // remove any results that are a result of a rule not in our list of complexity rules
        const messages = result.messages.filter(message => rules.indexOf(message.ruleId) > -1);
        return {
          ...result,
          messages,
          // correct the errorCount and warningCount
          errorCount: messages.filter(message => message.severity === 2).length,
          warningCount: messages.filter(message => message.severity === 1).length,
        };
      })
      .filter(result => result.messages.length > 0)
  );
};

/**
 * Construct a headline for the file including path to file, coloured text and an underline
 *
 *    path/to/file.js
 *    ===============
 *
 * @param {*} result
 */
const renderHeadline = result => {
  const trimmedFilePath = result.filePath.replace(process.env.PWD || '', '');
  return `${col.boldBlack}${trimmedFilePath}
${col.boldBlack}${'='.repeat(trimmedFilePath.length)}
${col.boldRed}errors: ${col.red}${result.errorCount}
${col.boldYellow}warnings: ${col.yellow}${result.warningCount}\n\n`;
};

/**
 * Render the messages for each rule, including the rule title
 *
 *    rule-name-in-black-bold
 *    line number : rule message in bold red
 *    line other number : message about different rule break
 *
 * @param {*} errorLabel
 * @param {*} messages
 */
const renderMessage = (errorLabel, messages) => `${col.boldBlack}${errorLabel}
${messages.join('\n')}
${col.reset}\n`;

/**
 * Collate the error messages into a string to return from the formatter to eslint
 *
 * @param {*} sorted
 */
const collectReport = sorted => {
  let report = '';
  sorted.forEach(result => {
    report += renderHeadline(result);
    const groupedMessages = groupMessages(result.messages);
    Object.keys(groupedMessages).forEach(key => {
      report += renderMessage(key, groupedMessages[key]);
    });
  });

  return report;
};
