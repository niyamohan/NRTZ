import  { fakeDb } from  '../../../../lib/db'; // データベース接続モジュール

export async function GET() {
  const accounts = fakeDb.getAccounts();
  return new Response(JSON.stringify(accounts));
}
