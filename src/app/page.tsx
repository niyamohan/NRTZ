"use client";

import Header from "@/components/Header/Header";
import PatientPage from "@/app/pages/patients/PatientPage";

const HomePage = () => (
  <div className="container mx-auto p-4">
    <Header />
    <PatientPage />
  </div>
);

export default HomePage;