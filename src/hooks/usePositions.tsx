import { useEffect, useState } from "react";
import { getPositions, submitRepo } from "../api/jobsApi";
import type { Position } from "../types/position";

export const usePositions = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPositions();
      setPositions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (
    jobId: number,
    repoUrl: string
  ) => {
    const response = await submitRepo(jobId, repoUrl);

    if (!response.ok) {
      throw new Error("Submission failed.");
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return {
    positions,
    isLoading,
    error,
    retry: fetchPositions,
    submitApplication,
  };
};