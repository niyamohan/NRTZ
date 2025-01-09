'use client';

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CommentList from "@/components/Comment/CommentList"; // CommentList コンポーネントのインポート
import Header from "@/components/Header/Header";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Comment } from "@/schemas/commentSchemas";
import { addCommentAction, deleteCommentAction, getAllCommentsByPatientIdAction, updateCommentAction } from "@/server/actions";

const PatientDetails = () => {
  // 選択されたアカウントを取得
  const selectedAccount = useSelector((state: RootState) => state.account.selectedAccount);

  const { id } = useParams(); // 動的ルートから id パラメータを取得
  const router = useRouter();
  const [patientDetails, setPatientDetails] = useState<{
    patient: { id: number; name: string };
    comments: Comment[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // コメント削除時の処理状態を制御
  const [isEditingFlag, setIsEditingFlag] = useState(false); // 編集状態を制御

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        try {
          const response = await getAllCommentsByPatientIdAction(String(id));

          if (response && response.patient && response.comments && response.comments.length > 0) {
            const updatedComments = response.comments.map((comment: any) => ({
              ...comment,
              patientId: response.patient.id, // patientId は患者 ID と仮定
            }));

            // 更新日時でソートし、最新のコメントを先に表示
            updatedComments.sort((a: Comment, b: Comment) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            setPatientDetails({ ...response, comments: updatedComments });
          } else {
            setError("コメントが見つかりませんでした。");
          }
        } catch (err) {
          console.error(err);
          setError("データ読み込み中にエラーが発生しました。後ほど再試行してください。");
        } finally {
          setLoading(false);
        }
      };

      fetchPatientDetails();
    }
  }, [id]);

  // コメント削除の関数
  const deleteComment = async (commentId: number) => {
    setIsProcessing(true);
    try {
      const response = await deleteCommentAction(commentId); // deleteCommentAction を使用してコメントを削除

      if (response.success) {
        alert('コメント削除完了');
        setPatientDetails((prevState) => {
          if (prevState) {
            // コメント削除後に再ソート
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
        alert(response.error || 'コメント削除エラー');
      }
    } catch (error) {
      alert('コメント削除中にエラーが発生しました');
    } finally {
      setIsProcessing(false);
    }
  };

  // コメント編集の関数
  const editComment = async (commentId: number, newContent: string) => {
    setIsProcessing(true);
    try {
      const response = await updateCommentAction(commentId, newContent); // updateCommentAction を使用してコメントを更新

      if (response.success) {
        alert('コメント編集完了');
        setPatientDetails((prevState) => {
          if (prevState) {
            // updatedComment が有効な updatedAt フィールドを含むことを確認
            if (!response.updatedComment.updatedAt) {
              response.updatedComment.updatedAt = new Date().toISOString();
            }

            // コメントデータを更新
            const updatedComments = prevState.comments.map((comment) =>
              comment.id === commentId ? { ...comment, ...response.updatedComment } : comment
            );

            // 更新日時でソート
            updatedComments.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

            return {
              ...prevState,
              comments: updatedComments,
            };
          }
          return prevState;
        });
      } else {
        alert(response.error || 'コメント編集エラー');
      }
    } catch (error) {
      alert('コメント編集中にエラーが発生しました');
    } finally {
      setIsProcessing(false);
    }
  };

  // コメント追加の関数
  const addComment = async (content: string) => {
    setIsProcessing(true);
    try {
      const accountId = selectedAccount?.id;
      const accountName = selectedAccount?.name;

      if (!accountId) {
        throw new Error('アカウントIDを取得できません');
      }

      if (!accountName) {
        throw new Error('アカウント名を取得できません');
      }

      // patientId が undefined でないことを確認
      if (!patientDetails?.patient.id) {
        throw new Error('患者IDを取得できません');
      }

      const response = await addCommentAction(content, patientDetails.patient.id, accountId, accountName);

      if (response.success) {
        setPatientDetails((prevState) => {
          if (prevState) {
            // 新しいコメントをリストに追加後、再ソート
            const updatedComments = [...prevState.comments, response.comment];
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
      alert('コメント追加中にエラーが発生しました');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <div>患者詳細を読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!patientDetails) {
    return <div>患者情報が見つかりません。</div>;
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
          {/* ユーザーアバター */}
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
            alert('コメントのリフレッシュ中にエラーが発生しました');
          } finally {
            setLoading(false);
          }
        }}
        isEditingFlag={isEditingFlag} // isEditingFlag を渡す
      />
    </div>
  );
};

export default PatientDetails;