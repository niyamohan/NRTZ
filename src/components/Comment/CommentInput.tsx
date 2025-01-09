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
      setNewComment(''); // 投稿後に入力フィールドをクリア
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-100 border-t p-4">
      <div className="flex items-center space-x-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 p-2 border rounded-md"
          placeholder="コメントを入力してください..."
          rows={1}
        />
        <button
          onClick={handleAddComment}
          className="bg-white text-black px-4 py-1 rounded-md"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            strokeWidth="0.00024000000000000003"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.3938 2.20468C3.70395 1.96828 4.12324 1.93374 4.4679 2.1162L21.4679 11.1162C21.7953 11.2895 22 11.6296 22 12C22 12.3704 21.7953 12.7105 21.4679 12.8838L4.4679 21.8838C4.12324 22.0662 3.70395 22.0317 3.3938 21.7953C3.08365 21.5589 2.93922 21.1637 3.02382 20.7831L4.97561 12L3.02382 3.21692C2.93922 2.83623 3.08365 2.44109 3.3938 2.20468ZM6.80218 13L5.44596 19.103L16.9739 13H6.80218ZM16.9739 11H6.80218L5.44596 4.89699L16.9739 11Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default CommentInput;