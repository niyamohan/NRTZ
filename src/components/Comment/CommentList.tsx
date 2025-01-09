'use client';

import React from 'react';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import { z } from 'zod';
import { CommentSchemas } from '@/schemas/commentSchemas';

// コメントリスト Props の Schema
export const CommentListPropsSchema = z.object({
  comments: z.array(CommentSchemas).nullable(), // コメントリスト、配列タイプ、null可能
  isEditingFlag: z.boolean(), // 編集中かどうか、ブール型
  isProcessing: z.boolean(), // 処理中かどうか、ブール型
  refreshComments: z.function().returns(z.promise(z.void())), // コメントをリフレッシュする関数、Promiseを返す
  deleteComment: z.function().args(z.number()).returns(z.promise(z.void())), // コメントを削除する関数、コメントIDを受け取りPromiseを返す
  editComment: z.function().args(z.number(), z.string()).returns(z.promise(z.void())), // コメントを編集する関数、IDと内容を受け取りPromiseを返す
  addComment: z.function().args(z.string()).returns(z.promise(z.void())), // 新しいコメントを追加する関数、内容を受け取りPromiseを返す
});

export type CommentListProps = z.infer<typeof CommentListPropsSchema>;

const CommentList = ({
  comments,
  isProcessing,
  deleteComment,
  editComment,
  addComment,
  refreshComments, // refreshComments を追加
}: CommentListProps) => {
  return (
    <div className="space-y-4">
      {/* コメントリストをレンダリング */}
      {comments && comments.length > 0 ? (
        comments.map((comment, index) => (
          <CommentCard
            key={index} // IDとaccountIdを組み合わせてユニークにする
            comment={comment}
            isEditingFlag={false}
            isProcessing={isProcessing}
            deleteComment={deleteComment}
            editComment={editComment}
            refreshComments={refreshComments} // refreshComments を渡す
          />
        ))
      ) : (
        <p className="text-gray-500">コメントはありません</p>
      )}

      {/* コメント入力フォームをレンダリング */}
      <CommentInput addComment={addComment} />
    </div>
  );
};

export default CommentList;