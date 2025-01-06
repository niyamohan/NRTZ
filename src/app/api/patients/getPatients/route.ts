import { fakeDb } from '@/lib/db';

export async function GET() {
  const patients =  fakeDb.getPatients();
  return new Response(JSON.stringify(patients));
} 
