'use client';

import React from 'react';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import { z } from 'zod';
import { CommentSchemas } from '@/schemas/commentSchemas';

// 评论列表 Props 数据的 Schema
export const CommentListPropsSchema = z.object({
  comments: z.array(CommentSchemas).nullable(), // 评论列表，数组类型，可以为空
  isEditingFlag: z.boolean(), // 是否在编辑状态，布尔类型
  isProcessing: z.boolean(), // 是否正在处理，布尔类型
  refreshComments: z.function().returns(z.promise(z.void())), // 刷新评论的函数，返回 Promise
  deleteComment: z.function().args(z.number()).returns(z.promise(z.void())), // 删除评论的函数，接受评论 ID 参数并返回 Promise
  editComment: z.function().args(z.number(), z.string()).returns(z.promise(z.void())), // 编辑评论的函数，接受评论 ID 和内容参数并返回 Promise
  addComment: z.function().args(z.string()).returns(z.promise(z.void())), // 新增评论的函数，接受评论内容参数并返回 Promise
});

export type CommentListProps = z.infer<typeof CommentListPropsSchema>;

const CommentList = ({
  comments,
  isProcessing,
  deleteComment,
  editComment,
  addComment,
  refreshComments,  // 添加 refreshComments
}: CommentListProps) => {

  return (
    <div className="space-y-4">
      {/* 渲染评论列表 */}
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentCard
            key={ index } // 将 id 和 accountId 结合起来确保唯一性
            comment={comment}
            isEditingFlag={false}
            isProcessing={isProcessing}
            deleteComment={deleteComment}
            editComment={editComment}
            refreshComments={refreshComments} // 传递 refreshComments
          />
        ))
      ) : (
        <p className="text-gray-500">暂无评论</p>
      )}

      {/* 渲染评论输入框 */}
      <CommentInput addComment={addComment} />
    </div>
  );
};

export default CommentList;