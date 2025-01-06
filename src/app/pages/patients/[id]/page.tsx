'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommentList from "@/components/Comment/CommentList"; // 引入 CommentList 组件
import Header from "@/components/Header/Header";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

const PatientDetails = () => {

  // 获取选中的账户
  const selectedAccount = useSelector((state: RootState) => state.account.selectedAccount);

  const { id } = useParams(); // 获取动态路由中的 id 参数
  const router = useRouter();
  const [patientDetails, setPatientDetails] = useState<{
    patient: { id: number; name: string };
    comments: Array<{
      id: number;
      content: string;
      accountName: string;
      createdAt: string;
      updatedAt: string;
      accountId: number;  // 添加 accountId
      patientId: number;  // 添加 patientId
    }>;
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
        alert('评论删除成功');
        setPatientDetails((prevState) => {
          if (prevState) {
            return {
              ...prevState,
              comments: prevState.comments.filter((comment) => comment.id !== commentId),
            };
          }
          return prevState;
        });
      } else {
        alert('评论删除失败');
      }
    } catch (error) {
      alert('删除评论时发生错误');
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
            return {
              ...prevState,
              comments: prevState.comments.map((comment) =>
                comment.id === commentId ? updatedComment : comment
              ),
            };
          }
          return prevState;
        });
      } else {
        alert('评论编辑失败');
      }
    } catch (error) {
      alert('编辑评论时发生错误');
    } finally {
      setIsProcessing(false);
    }
  };

  // 添加评论的函数
  const addComment = async (content: string) => {
    setIsProcessing(true);
    try {

      // 从redux中获取选择account信息
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
            return {
              ...prevState,
              comments: [...prevState.comments, newComment.comment], // 更新评论列表
            };
          }
          return prevState;
        });
      } else {
        alert('评论添加失败');
      }
    } catch (error) {
      alert('添加评论时发生错误');
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
      <h1 className="text-2xl font-bold mb-4">患者详情</h1>
      <div className="mb-6">
        <p>
          <strong>姓名:</strong> {patient.name}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">评论</h2>

      {/* 将 CommentList 组件添加到此处 */}
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
              alert('刷新评论失败');
            }
          } catch (error) {
            alert('刷新评论时发生错误');
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