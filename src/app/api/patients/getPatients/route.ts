import  { fakeDb } from  '../../../../lib/db'; // データベース接続モジュール

export async function GET() {
  const patients =  fakeDb.getPatients();
  return new Response(JSON.stringify(patients));
} 
