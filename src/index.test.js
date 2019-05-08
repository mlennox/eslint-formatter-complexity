import index from './index';

describe('complexity index', () => {
  describe('with no results', () => {

    test('if no matching rules in results return appropriate message', () => {
      const meta = {
        rulesMeta: {
          'not-a-complexity-metric-rule': {},
          'also-not-complexity-metric': {},
        },
      };
      const expected = 'None of the rules we want were used';
      const output = index(null, meta);
      expect(output).toEqual(expected);
    });

    test('if no messages from complexity rules then return appropriate message', () => {
      // list of all the rules that were run against the codebase
      const meta = {
        rulesMeta: {
          'not-a-complexity-metric-rule': {},
          'also-not-complexity-metric': {},
          complexity: {},
        },
      };
      // list of rule violations in the codebase
      const results = [
        {
          filePath: 'path/to/source.one.js',
          messages: [
            {
              ruleId: 'not-a-complexity-metric-rule',
            },
          ],
        },
      ];
      const expected = 'No complexity issues were found';
      const output = index(results, meta);
      expect(output).toEqual(expected);
    });


  });
});
