import { fakeDb } from '@/lib/db'

export async function POST(request: Request) {
  const { id } = await request.json();
  await fakeDb.deleteComment(id);
  return new Response(JSON.stringify({ success: true }));
}
