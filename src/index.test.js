import index from './index';

describe('complexity index', () => {
  test('if no matching rules in results return appropriate message', () => {
    const meta = { rulesMeta: {} };
    const expected = 'None of the rules we want were used';
    const output = index(null, rulesMeta);
    expect(output).toEqual(expected);
  });
  test('if no messages fromm complexity rules then return appropriate message', () => {});
  test('');
});
