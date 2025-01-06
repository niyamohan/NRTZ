// components/comment/CommentInput.tsx
'use client';

import React, { useState } from 'react';

interface CommentInputProps {
  addComment: (content: string) => void;
}

const CommentInput = ({ addComment }: CommentInputProps) => {
  const [newComment, setNewComment] = useState<string>('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      addComment(newComment);
      setNewComment(''); // 提交后清空输入框
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 border rounded-md"
        placeholder="新しいコメントを投稿..."
      />
      <div className="flex justify-end">
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-1 text-sm rounded-md"
        >
          投稿
        </button>
      </div>
    </div>
  );
};

export default CommentInput;