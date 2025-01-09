// src/app/pages/patients/index.tsx (または PatientsPage.tsx)

import React from "react";
import { useRouter } from "next/navigation";
import usePatients from "@/hooks/usePatients";

const PatientsPage = () => {
  const { patients, loading, error } = usePatients(); // 患者データを取得
  const router = useRouter();

  // 患者詳細ページに移動
  const handlePatientClick = (patientId: number) => {
    router.push(`/pages/patients/${patientId}`); // 動的ルートへのパス
  };

  // 読み込み中の状態をレンダリング
  if (loading) {
    return <div>読み込み中...</div>;
  }

  // エラー状態をレンダリング
  if (error) {
    return <div>エラー: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex justify-between items-center bg-white shadow-md p-4 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handlePatientClick(patient.id)} // クリックで患者詳細ページに移動
        >
          <h2 className="text-xl font-semibold flex items-center">
            {/* ユーザーアイコン */}
            <svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="mr-4">
              <path d="M12 2.5a5.5 5.5 0 00-3.096 10.047 9.005 9.005 0 00-5.9 8.18.75.75 0 001.5.045 7.5 7.5 0 0114.993 0 .75.75 0 101.499-.044 9.005 9.005 0 00-5.9-8.181A5.5 5.5 0 0012 2.5zM8 8a4 4 0 118 0 4 4 0 01-8 0z" />
            </svg>

            {patient.name}
          </h2>
          <span className="text-gray-400 text-2xl">➤</span>
        </div>
      ))}
    </div>
  );
};

export default PatientsPage;