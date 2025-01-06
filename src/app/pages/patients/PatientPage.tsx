import React from "react";
import { useRouter } from "next/navigation";
import usePatients from "@/hooks/usePatients";  // 引入自定义 Hook

const PatientPage = () => {
  const patients = usePatients();  // 获取患者数据
  const router = useRouter();

  const handlePatientClick = (patientId: number) => {
    router.push(`/pages/comments/${patientId}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex justify-between items-center bg-white shadow-md p-4 rounded-md hover:bg-gray-100 cursor-pointer"
          onClick={() => handlePatientClick(patient.id)}
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

export default PatientPage;