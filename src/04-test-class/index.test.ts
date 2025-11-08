import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  random: jest.fn(),
}));

describe('BankAccount', () => {
  let account: BankAccount;
  let otherAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(100);
    otherAccount = getBankAccount(50);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(150, otherAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(account.getBalance()).toBe(100);
    expect(otherAccount.getBalance()).toBe(50);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(30);
    expect(account.getBalance()).toBe(70);
  });

  test('should transfer money', () => {
    account.transfer(30, otherAccount);
    expect(account.getBalance()).toBe(70);
    expect(otherAccount.getBalance()).toBe(80);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock).mockImplementationOnce(() => 250);
    (lodash.random as jest.Mock).mockImplementationOnce(() => 1);
    await expect(account.fetchBalance()).resolves.toBe(250);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(123);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(123);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    expect(account.getBalance()).toBe(100);
  });
});
