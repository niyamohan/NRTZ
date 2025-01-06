import { fakeDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // 解析请求体中的数据
    const jsonData = await request.json();
    const { content, patientId, accountId, accountName } = jsonData;

    // 确保所有必要的字段都存在
    if (!content || !patientId || !accountId || !accountName) {
      return new Response(
        JSON.stringify({ success: false, message: 'Missing required fields' }),
        { status: 400 }
      );
    }

    // 调用 fakeDb 的 addComment 方法添加评论
    const newComment = fakeDb.addComment(content, patientId, accountId, accountName);

    // 返回成功响应，包含新添加的评论
    return new Response(JSON.stringify({ success: true, comment: newComment }), { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to add comment' }),
      { status: 500 }
    );
  }
}