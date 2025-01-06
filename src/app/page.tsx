"use client";

import Header from "@/components/Header/Header";
import PatientsPage from "@/app/pages/patients/PatientsPage";

const HomePage = () => (
  <div className="container mx-auto p-4">
    <Header />
    <PatientsPage />
  </div>
);

export default HomePage;