import { Patient } from "@/models/Patient";
import { useState, useEffect } from "react";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch("/api/patients/getPatients");
        if (response.ok) {
          const data: Patient[] = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchPatients();
  }, []);

  return patients;
};

export default usePatients;