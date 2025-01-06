import { fakeDb } from '@/lib/db'

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // 获取请求体中的 content
    const { content } = await request.json();

    // 确保 id 是有效的数字
    const commentId = Number(params.id);
    if (isNaN(commentId)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Invalid comment ID' }),
        { status: 400 }
      );
    }

    // 更新评论
    const updatedComment = fakeDb.updateComment(commentId, content);
    if (updatedComment) {
      return new Response(JSON.stringify(updatedComment), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ success: false, message: 'Comment not found' }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to update comment' }),
      { status: 500 }
    );
  }
}