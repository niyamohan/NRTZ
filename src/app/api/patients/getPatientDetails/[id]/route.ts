import { fakeDb } from '@/lib/db';

export async function GET(request: Request,{ params }: { params: { id: string } }) {

  const patientId = Number(params.id);
  
  const patients =  fakeDb.getPatientsByPatientId(Number(patientId));
  return new Response(JSON.stringify(patients));
} 
