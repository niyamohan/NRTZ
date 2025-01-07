'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CommentCardProps } from '@/models/Comment'; // 引入 CommentCardProps 类型
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const CommentCard = ({ comment, isEditingFlag, isProcessing, deleteComment, editComment, refreshComments }: CommentCardProps) => {
  // 获取选中的账户
  const selectedAccount = useSelector((state: RootState) => state.account.selectedAccount);

  // 判断当前评论的账户 ID 是否与 Redux 中选中的账户 ID 相同
  const isOwnComment = selectedAccount?.name === comment.accountName;

  const [isEditing, setIsEditing] = useState(isEditingFlag);
  const [content, setContent] = useState(comment.content);
  const commentCardRef = useRef<HTMLDivElement>(null); // 用于监听点击事件是否发生在编辑框外

  // 删除评论的回调
  const handleDelete = () => {
    if (window.confirm('本当に削除しますか？')) {
      deleteComment(comment.id);
    }
  };

  // 编辑评论的回调
  const handleEdit = () => {
    editComment(comment.id, content).then(() => {
      setIsEditing(false);
      //refreshComments(); // 重新加载评论
    });
  };

  // 点击事件处理：判断是否点击在编辑区域外
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentCardRef.current && !commentCardRef.current.contains(event.target as Node)) {
        if (isEditing) {
          // 如果在编辑模式且点击在编辑框外，则弹出确认框
          const shouldCancel = window.confirm('編集中の内容は保存されません。編集をキャンセルしますか？');
          if (shouldCancel) {
            setIsEditing(false);
            setContent(comment.content); // 取消编辑，恢复原内容
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
          {/* 用户头像 */}
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
          onClick={() => isOwnComment && setIsEditing(true)} // 只有评论的拥有者可以编辑
        >
          {comment.content}
        </p>
      )}

      <div className="flex justify-end">
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-1 text-sm rounded-md">
          {isProcessing ? '処理中...' : '削除'}
        </button>
      </div>
    </div>
  );
};

export default CommentCard;