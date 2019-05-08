import { groupMessages, getOnlyComplexityResults, remapResult } from './processMessages';

describe('processMessages', () => {
  const nonComplexResults = [
    {
      filePath: 'path/to/file.js',
      errorCount: 0,
      warningCount: 2,
      messages: [
        { ruleId: 'not-complexity', severity: 1, line: 1, column: 4, nodeType: 'CallExpression' },
        { ruleId: 'also-not-complex', severity: 1, line: 4, column: 3, nodeType: 'BlockExpression' },
      ],
    },
  ];

  const complexResults = [
    {
      filePath: 'path/to/file.js',
      errorCount: 1,
      warningCount: 2,
      messages: [
        { ruleId: 'not-complexity', severity: 1, line: 1, column: 4, nodeType: 'CallExpression' },
        { ruleId: 'complexity', severity: 2, line: 1, column: 4, nodeType: 'CallExpression' },
        { ruleId: 'max-lines', severity: 1, line: 4, column: 3, nodeType: 'BlockExpression' },
      ],
    },
  ];

  describe('groupMessages', () => {
    test('messages grouped by ruleId', () => {
      const messages = [
        { ruleId: 'some-rule', message: 'line 1 is wrong' },
        { ruleId: 'some-rule', message: 'line 3 is also wrong' },
      ];
      const expectedKeys = ['some-rule'];
      const result = groupMessages(messages);
      const resultKeys = Object.keys(result);
      expect(resultKeys).toEqual(expectedKeys);
    });
  });

  describe('getOnlyComplexityResults', () => {
    test('results with no complexity rules returns empty list', () => {
      const result = getOnlyComplexityResults(nonComplexResults);
      expect(result.length).toEqual(0);
    });
    test('results with complexity rules remapped and counts ', () => {
      const expectedMessages = [
        { ruleId: 'complexity', severity: 2, line: 1, column: 4, nodeType: 'CallExpression' },
        { ruleId: 'max-lines', severity: 1, line: 4, column: 3, nodeType: 'BlockExpression' },
      ];
      const [result] = getOnlyComplexityResults(complexResults);
      expect(result.messages).toEqual(expectedMessages);
    });
    test('results with complexity rules have counts adjusted', () => {
      const [result] = getOnlyComplexityResults(complexResults);
      expect(result.errorCount).toEqual(1);
      expect(result.warningCount).toEqual(1);
    });
  });

  describe('remapResult', () => {
    test('counts updated correctly from complexityMessages', () => {
      const complexityMessages = [
        { ruleId: 'complexity', severity: 2, line: 1, column: 4, nodeType: 'CallExpression' },
        { ruleId: 'max-lines', severity: 1, line: 4, column: 3, nodeType: 'BlockExpression' },
      ];
      expect(complexResults[0].warningCount).toEqual(2);

      const result = remapResult(complexResults[0], complexityMessages);

      expect(result.warningCount).toEqual(1);
    });
  });
});
