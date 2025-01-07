'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommentList from "@/components/Comment/CommentList"; // 引入 CommentList 组件
import Header from "@/components/Header/Header";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import {Comment} from "@/models/Comment"

const PatientDetails = () => {
  // 获取选中的账户
  const selectedAccount = useSelector((state: RootState) => state.account.selectedAccount);

  const { id } = useParams(); // 获取动态路由中的 id 参数
  const router = useRouter();
  const [patientDetails, setPatientDetails] = useState<{
    patient: { id: number; name: string };
    comments: Comment[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // 控制删除评论时的处理状态
  const [isEditingFlag, setIsEditingFlag] = useState(false); // 新增编辑状态

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        try {
          const response = await fetch(`/api/patients/getPatientDetails/${id}`);

          if (response.ok) {
            const data = await response.json();

            // 给每个评论添加 patientId 和 accountId
            const updatedComments = data.comments.map((comment: any) => ({
              ...comment,
              patientId: data.patient.id, // 假设 patientId 是患者 ID
              accountId: data.patient.accountId, // 假设 accountId 是患者的账户 ID
            }));

            // 按更新时间排序，最新的评论排在最前面
            updatedComments.sort((a: Comment, b: Comment) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            setPatientDetails({ ...data, comments: updatedComments });
          } else {
            setError(`Failed to fetch patient details: ${response.statusText}`);
          }
        } catch (err) {
          console.log(err);

          setError("加载数据时发生错误，请稍后重试。");
        } finally {
          setLoading(false);
        }
      };

      fetchPatientDetails();
    }
  }, [id]);

  // 删除评论的函数
  const deleteComment = async (commentId: number) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/comments/deleteComment/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('コメント削除完了');
        setPatientDetails((prevState) => {
          if (prevState) {
            // 删除评论后重新排序
            const updatedComments = prevState.comments.filter((comment) => comment.id !== commentId);
            updatedComments.sort((a: Comment, b: Comment) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            return {
              ...prevState,
              comments: updatedComments,
            };
          }
          return prevState;
        });
      } else {
        alert('コメント削除エラー');
      }
    } catch (error) {
      alert('コメント削除时エラー発生');
    } finally {
      setIsProcessing(false);
    }
  };

  // 编辑评论的函数
  const editComment = async (commentId: number, newContent: string) => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/comments/editComment/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({ content: newContent }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const updatedComment = await response.json();
        setPatientDetails((prevState) => {
          if (prevState) {

            // 确保 updatedComment 包含有效的 updatedAt 字段
            if (!updatedComment.updatedAt) {
              updatedComment.updatedAt = new Date().toISOString();
            }
            // 更新评论数据
            const updatedComments = prevState.comments.map((comment) =>
              comment.id === commentId ? { ...comment, ...updatedComment } : comment
            );

            // 按更新时间排序
            updatedComments.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            return {
              ...prevState,
              comments: updatedComments,
            };
          }
          return prevState;
        });
      } else {
        alert('コメント編集エラー');
      }
    } catch (error) {
      alert('コメント編集时エラー発生');
    } finally {
      setIsProcessing(false);
    }
  };

  // 添加评论的函数
  const addComment = async (content: string) => {
    setIsProcessing(true);
    try {
      const accountId = selectedAccount?.id;
      const accountName = selectedAccount?.name;

      const response = await fetch(`/api/comments/addComment`, {
        method: 'POST',
        body: JSON.stringify({
          content,
          patientId: patientDetails?.patient.id,
          accountId,  // 使用 accountId
          accountName, // 使用 accountName
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const newComment = await response.json();
        setPatientDetails((prevState) => {
          if (prevState) {
            // 新评论添加到列表后重新排序
            const updatedComments = [...prevState.comments, newComment.comment];
            updatedComments.sort((a: Comment, b: Comment) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            return {
              ...prevState,
              comments: updatedComments,
            };
          }
          return prevState;
        });
      } else {
        alert('コメント追加エラー');
      }
    } catch (error) {
      alert('コメント追加时エラー発生');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div>加载患者详情中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!patientDetails) {
    return <div>未找到患者信息。</div>;
  }

  const { patient, comments } = patientDetails;

  return (
    <div className="p-6">
      <Header />
      <Link href={`/`} className="flex items-center space-x-4 text-black text-sm font-medium  p-2 pl-0 clear-right">
        <svg fill="#000000" width="32px" height="32px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M15.28 5.22a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 000 1.06l6.25 6.25a.75.75 0 101.06-1.06L9.56 12l5.72-5.72a.75.75 0 000-1.06z" />
        </svg>
        一覧に戻る
      </Link>
      <div className="mb-6">
        <div className="flex items-center">
          {/* 用户头像 */}
          <svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-4">
            <path d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z" />
          </svg>

          <h1 className="text-gray-800 font-medium">{patient.name}</h1>
        </div>
      </div>

      <hr className="border-gray-300 my-6" />
      <CommentList
        comments={comments}
        isProcessing={isProcessing}
        deleteComment={deleteComment}
        editComment={editComment}
        addComment={addComment}
        refreshComments={async () => {
          setLoading(true);
          try {
            const response = await fetch(`/api/patients/getPatientDetails/${id}`);
            if (response.ok) {
              const data = await response.json();
              setPatientDetails(data);
            } else {
              alert('コメントのリフレッシュエラー');
            }
          } catch (error) {
            alert('コメントのリフレッシュ时エラー発生');
          } finally {
            setLoading(false);
          }
        }}
        isEditingFlag={isEditingFlag} // 传递 isEditingFlag
      />
    </div>
  );
};

export default PatientDetails;