// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator(0, 0, Action, 'add', {
      a: 2,
      b: 3,
      action: Action.Add,
    });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator(0, 0, Action, 'subtract', {
      a: 3,
      b: 2,
      action: Action.Subtract,
    });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator(0, 0, Action, 'multiply', {
      a: 3,
      b: 2,
      action: Action.Multiply,
    });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator(0, 0, Action, 'divide', {
      a: 6,
      b: 2,
      action: Action.Divide,
    });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator(0, 0, Action, 'exponentiate', {
      a: 6,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(36);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator(0, 0, Action, 'invalid action', {
      a: 3,
      b: 2,
      action: 'invalid',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result1 = simpleCalculator(0, 0, Action, 'invalid arguments', {
      a: '3',
      b: 2,
      action: 'invalid',
    });
    expect(result1).toBeNull();

    const result2 = simpleCalculator(0, 0, Action, 'invalid arguments', {
      a: 3,
      b: '2',
      action: 'invalid',
    });
    expect(result2).toBeNull();
  });
});
