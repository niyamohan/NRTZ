import { Patient } from "@/models/Patient";
import { useState, useEffect } from "react";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch("/api/patients/getPatients");
        if (response.ok) {
          const data: Patient[] = await response.json();
          setPatients(data);
        } else {
          setError("Failed to fetch patients");
        }
      } catch (error) {
        setError("Error fetching patients");
      } finally {
        setLoading(false);
      }
    }

    fetchPatients();
  }, []);

  return { patients, loading, error };
};

export default usePatients;