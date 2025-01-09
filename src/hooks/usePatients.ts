import { Patient } from "@/schemas/patientSchemas";
import { getAllPatientsAction } from "@/server/actions";
import { useState, useEffect } from "react";

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true); 

      try {
        const response = await getAllPatientsAction(); // getAllPatientsAction函数
        if (response.success) {
          setPatients(response.patients);
        } else {
          setError(response.error || "Failed to fetch patients");
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