const errorSorter = require('./errorSorter');
const { rules } = require('./rules');

/**
 * Run through the messages for a file result and group
 * each error by ruleId
 */
const groupMessages = messages => {
  const grouped = {};
  messages.forEach(message => {
    if (message.ruleId in grouped) {
      grouped[message.ruleId].push(message);
    } else {
      grouped[message.ruleId] = [message];
    }
  });
  return grouped;
};

/**
 * Apply sorting to file results and then group messages within each file result
 */
const sortAndGroup = complexityResults =>
  complexityResults.sort(errorSorter).map(result => {
    const groupedMessages = groupMessages(result.messages);
    return {
      filePath: result.filePath,
      relativeFilePath: result.filePath.replace(process.env.PWD || '', ''),
      errorCount: calculateRuleViolations(groupedMessages, 2),
      warningCount: calculateRuleViolations(groupedMessages, 1),
      messages: groupedMessages,
    };
  });

/**
 * Counts the rule violations, matching the severity, in the groupedMessages
 * @param {object} groupedMessages
 * @param {int} severity
 */
const calculateRuleViolations = (groupedMessages, severity) => {
  let count = 0;
  // TODO : replace this with reduce
  Object.keys(groupedMessages).forEach(ruleId => {
    groupedMessages[ruleId].forEach(message => {
      count += severity === message.severity ? 1 : 0;
    });
  });
  return count;
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
        const complexityMessages = result.messages.filter(message => rules.indexOf(message.ruleId) > -1);
        return remapResult(result, complexityMessages);
      })
      .filter(result => result.messages.length > 0)
  );
};

const remapResult = (result, complexityMessages) => {
  return {
    ...result,
    messages: complexityMessages,
    // correct the errorCount and warningCount
    errorCount: complexityMessages.filter(message => message.severity === 2).length,
    warningCount: complexityMessages.filter(message => message.severity === 1).length,
  };
};

module.exports = {
  groupMessages,
  sortAndGroup,
  getOnlyComplexityResults,
  remapResult,
};
