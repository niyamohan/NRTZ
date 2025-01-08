import AsyncLock from 'async-lock';
import { readDataFile } from '@/db/db_config';
import { Patient } from '@/schemas/patientSchemas';

const lock = new AsyncLock();
const withLock = <T>(fn: (...args: any[]) => Promise<T>) => {
  return (...args: any[]): Promise<T> => {
    return lock.acquire('patients', () => fn(...args));
  };
};

export const patientsDb = {
  findAll: async () => {
    const patients = await readDataFile<Patient>('patients');
    // ソート条件を更新日時から名前に変更
    patients.sort((a, b) => a.name.localeCompare(b.name));
    return patients;
  },
};