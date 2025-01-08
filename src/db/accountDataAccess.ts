import AsyncLock from 'async-lock';
import { readDataFile } from '@/db/db_config';
import { Account } from '@/schemas/accountSchemas';

const lock = new AsyncLock();
const withLock = <T>(fn: (...args: any[]) => Promise<T>) => {
  return (...args: any[]): Promise<T> => {
    return lock.acquire('accounts', () => fn(...args));
  };
};

export const accountsDb = {
  findFirst: withLock(async (id: number) => {
    const accounts = await readDataFile<Account>('accounts');
    return accounts.find((account) => account.id === id);
  }),
  findMany: withLock(async () => {
    const accounts = await readDataFile<Account>('accounts');
    return accounts;
  }),
};