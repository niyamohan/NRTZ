// components/comment/CommentList.tsx
'use client';

import React from 'react';
import { CommentListProps } from '@/models/Comment';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';

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