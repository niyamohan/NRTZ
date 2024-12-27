"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// 定义患者类型
interface Patient {
  id: string;
  name: string;
  registeredAt: string;
}

const HomePage = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const router = useRouter();

  // 获取患者数据
  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch("/api/patients");
        if (response.ok) {
          const data: Patient[] = await response.json();
          setPatients(data); // 设置患者数据
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchPatients();
  }, []);

  const handlePatientClick = (patientId: string) => {
    router.push(`/pages/comments/${patientId}`);
  };

  return (
    <div className="container mx-auto p-4">
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
            <span className="text-gray-400 text-2xl">➤</span> {/* 小尖头 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;