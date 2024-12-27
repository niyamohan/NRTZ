"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

// 定义评论类型
interface Comment {
  id: string;
  content: string;
  author: string;
  updatedAt: string;
}

// 定义账户类型（模拟）
const currentAccount = "Account 1"; // 当前操作账户

const CommentPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const params = useParams();
  const router = useRouter();
  const { patientId } = params || {};

  // 获取评论数据
  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments/${patientId}`);
        if (response.ok) {
          const data: Comment[] = await response.json();
          setComments(data);
        } else {
          console.error("Failed to fetch comments");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, [patientId]);

  // 删除评论
  const handleDeleteComment = async (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  // 编辑评论
  const handleEditComment = async (commentId: string, content: string) => {
    setEditingCommentId(commentId);
    setEditingContent(content);
  };

  const handleSaveEdit = async () => {
    if (editingCommentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === editingCommentId
            ? { ...comment, content: editingContent, updatedAt: new Date().toISOString() }
            : comment
        )
      );
      setEditingCommentId(null);
    }
  };

  // 发布新评论
  const handleAddComment = async () => {
    const newCommentObj = {
      id: Math.random().toString(36).substr(2, 9),
      content: newComment,
      author: currentAccount,
      updatedAt: new Date().toISOString(),
    };
    setComments((prev) => [newCommentObj, ...prev]);
    setNewComment("");
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => router.push("/")}
      >
        返回列表
      </button>
      <div className="mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white shadow-md p-4 rounded-md mb-4 flex justify-between items-start"
          >
            {editingCommentId === comment.id ? (
              <textarea
                value={editingContent}
                onChange={(e) => setEditingContent(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            ) : (
              <div>
                <p className="text-gray-700">{comment.content}</p>
                <small className="text-gray-500">
                  By {comment.author} at {new Date(comment.updatedAt).toLocaleString()}
                </small>
              </div>
            )}
            <div className="flex gap-2">
              {comment.author === currentAccount && (
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  onClick={() => handleEditComment(comment.id, comment.content)}
                >
                  编辑
                </button>
              )}
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md"
                onClick={() => handleDeleteComment(comment.id)}
              >
                删除
              </button>
              {editingCommentId === comment.id && (
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                  onClick={handleSaveEdit}
                >
                  保存
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="发布新评论..."
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          发布
        </button>
      </footer>
    </div>
  );
};

export default CommentPage;