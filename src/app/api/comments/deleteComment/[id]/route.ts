import { fakeDb } from '@/lib/db'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // 确保 params 已经被正确处理，等待它
  const { id } = await params; // 等待 params

  // 获取患者 ID
  const commentId = Number(id); // 转换为数字
  
  await fakeDb.deleteComment(commentId);
  return new Response(JSON.stringify({ success: true }));
}