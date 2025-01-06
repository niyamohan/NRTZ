"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const PatientDetails = () => {
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
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatientDetails = async () => {
        try {
          const response = await fetch(`/api/patients/getPatientDetails/${id}`);
          
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setPatientDetails(data);
          } else {
            setError(`Failed to fetch patient details: ${response.statusText}`);
          }
        } catch (err) {
          setError("加载数据时发生错误，请稍后重试。");
        } finally {
          setLoading(false);
        }
      };

      fetchPatientDetails();
    }
  }, [id]);

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
      <h1 className="text-2xl font-bold mb-4">患者详情</h1>
      <div className="mb-6">
        <p>
          <strong>姓名:</strong> {patient.name}
        </p>
        {/* 可根据需要添加更多患者详情 */}
      </div>

      <h2 className="text-xl font-semibold mb-4">评论</h2>
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
              <div className="font-semibold">
                {comment.accountName} 评论:
              </div>
              <p className="text-gray-700 mt-2">{comment.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                创建时间: {comment.createdAt}
              </p>
              <p className="text-sm text-gray-500">
                更新时间: {comment.updatedAt}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">暂无评论。</p>
      )}
    </div>
  );
};

export default PatientDetails;