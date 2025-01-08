import AsyncLock from 'async-lock';
import { readDataFile, writeDataFile} from '@/db/db_config';
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
    patients.sort((a, b) => b.updatedAt - a.updatedAt);
    return patients;
  },

  updateUpdatedAtById: withLock(async (patientId: number) => {
    const patients = await readDataFile<Patient>('patients');
    const updatedPatients = patients.map(patient =>
      patient.id === patientId ? { ...patient, updatedAt: Date.now() } : patient
    );
    await writeDataFile('patients', updatedPatients);
    return updatedPatients;
  }),
};