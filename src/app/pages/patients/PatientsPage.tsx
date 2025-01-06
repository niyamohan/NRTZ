// src/app/pages/patients/index.tsx (或者 PatientsPage.tsx)

import React from "react";
import { useRouter } from "next/navigation";  // 使用 next/navigation 的 useRouter
import usePatients from "@/hooks/usePatients";  // 引入自定义 Hook

const PatientsPage = () => {
  const { patients, loading, error } = usePatients();  // 获取患者数据
  const router = useRouter();

  // 跳转到患者详情页
  const handlePatientClick = (patientId: number) => {
    router.push(`/pages/patients/${patientId}`); // 路径指向动态路由
  };


  // 渲染加载状态
  if (loading) {
    return <div>加载中...</div>;
  }

  // 渲染错误状态
  if (error) {
    return <div>错误: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex justify-between items-center bg-white shadow-md p-4 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handlePatientClick(patient.id)}  // 点击跳转到患者详情
        >
          <h2 className="text-xl font-semibold flex items-center">
            <span className="mr-2">👤</span>
            {patient.name}
          </h2>
          <span className="text-gray-400 text-2xl">➤</span>
        </div>
      ))}
    </div>
  );
};

export default PatientsPage;