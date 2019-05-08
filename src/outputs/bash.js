const col = require('../console.colours');

module.exports = complexityResults => {
  console.log(complexityResults);
  return complexityResults.map(result => `\n${renderHeadline(result)}${renderMessages(result.messages)}`).join('\n');
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
  return `${col.boldBlack} ${result.relativeFilePath}
${col.boldBlack} ${'='.repeat(result.relativeFilePath.length)}
${col.boldRed} errors: ${col.red} ${result.errorCount}
${col.boldYellow} warnings: ${col.yellow} ${result.warningCount} \n`;
};

/**
 * Render the messages for each rule, including the rule title
 *
 *    rule-name-in-black-bold
 *    line number : rule message in bold red
 *    line other number : message about different rule break
 *
 * @param {*} ruleId
 * @param {*} messages
 */
const renderMessages = messages =>
  `${Object.keys(messages).map(ruleId => {
    return `\n${col.boldBlack} ${ruleId} ${col.reset}\n${messages[ruleId]
      .map(message => `${severityColour(message)}Line ${message.line} : ${message.message} ${col.reset}`)
      .join('\n')}`;
  })}   \n`;

const severityColour = message => `${message.severity === 1 ? col.yellow : col.red} `;
