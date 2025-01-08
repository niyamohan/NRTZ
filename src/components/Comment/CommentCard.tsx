'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CommentCardProps } from '@/models/Comment'; 
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const CommentCard = ({ comment, isEditingFlag, isProcessing, deleteComment, editComment, refreshComments }: CommentCardProps) => {
  const selectedAccount = useSelector((state: RootState) => state.account.selectedAccount);
  const isOwnComment = selectedAccount?.name === comment.accountName;

  const [isEditing, setIsEditing] = useState(isEditingFlag);
  const [content, setContent] = useState(comment.content);
  const commentCardRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (window.confirm('本当に削除しますか？')) {
      deleteComment(comment.id);
    }
  };

  const handleEdit = () => {
    editComment(comment.id, content).then(() => {
      setIsEditing(false);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentCardRef.current && !commentCardRef.current.contains(event.target as Node)) {
        if (isEditing) {
          const shouldCancel = window.confirm('編集中の内容は保存されません。編集をキャンセルしますか？');
          if (shouldCancel) {
            setIsEditing(false);
            setContent(comment.content);
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, comment.content]);

  return (
    <div ref={commentCardRef} className="bg-white shadow-md rounded-lg p-4 space-y-2">
      <div className="flex items-center space-x-4">
        <div className="bg-gray-300 rounded-lg p-2">
          <svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z"/>
          </svg>
        </div>
        <span className="text-gray-800 font-medium">{comment.accountName}</span>
      </div>
      <div className="text-sm text-gray-500">{comment.updatedAt}</div>

      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 p-2 border rounded w-full"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleEdit}
              className="bg-green-500 text-white px-4 py-1 text-sm rounded-md"
            >
              保存
            </button>
          </div>
        </div>
      ) : (
        <p
          className="text-gray-700 cursor-pointer"
          onClick={() => isOwnComment && setIsEditing(true)}
        >
          {comment.content}
        </p>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          className="flex items-center bg-red-500 text-white px-4 py-1 text-sm rounded-md"
        >
          <svg
            width="12px"
            height="12px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
            stroke="#ffffff"
            className="align-text-bottom m-1"
          >
            <path
              d="M308.224 168.813714v-33.938285c0-56.32 45.641143-101.888 101.888-101.888h203.776c56.32 0 101.888 45.641143 101.888 101.888v33.938285h237.714286a33.938286 33.938286 0 0 1 0 67.949715H70.509714a33.938286 33.938286 0 0 1 0-67.949715h237.714286z m67.949714 0h271.652572v-33.938285a33.938286 33.938286 0 0 0-33.938286-33.938286H410.112a33.938286 33.938286 0 0 0-33.938286 33.938286v33.938285z m407.186286 710.582857V304.786286a34.084571 34.084571 0 1 1 68.242286 0v605.915428a73.142857 73.142857 0 0 1-73.142857 73.142857H245.540571a73.142857 73.142857 0 0 1-73.142857-73.142857V304.64a33.938286 33.938286 0 0 1 67.949715 0v574.756571a36.571429 36.571429 0 0 0 36.571428 36.571429h469.869714a36.571429 36.571429 0 0 0 36.571429-36.571429zM376.173714 338.651429c18.724571 0 33.938286 15.213714 33.938286 33.938285v407.478857a33.938286 33.938286 0 0 1-67.876571 0V372.589714c0-18.724571 15.140571-33.938286 33.938285-33.938285zM512 338.651429c18.724571 0 33.938286 15.213714 33.938286 33.938285v407.478857a33.938286 33.938286 0 0 1-67.876572 0V372.589714c0-18.724571 15.213714-33.938286 33.938286-33.938285z m135.826286 0c18.797714 0 33.938286 15.213714 33.938285 33.938285v407.478857a33.938286 33.938286 0 0 1-67.876571 0V372.589714c0-18.724571 15.213714-33.938286 33.938286-33.938285z"
              fill="#ffffff"
            />
          </svg>
          {isProcessing ? '処理中...' : '削除'}
        </button>
      </div>
    </div>
  );
};

export default CommentCard;