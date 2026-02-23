import type {
  SubmitApplicationRequest,
  SubmitApplicationResponse,
} from "../types/submission";
import { axiosInstance } from "./axiosInstance";

const UUID = import.meta.env.VITE_UUID;
const CANDIDATE_ID = import.meta.env.VITE_CANDIDATE_ID;

export const getPositions = async () => {
  const { data } = await axiosInstance.get("/api/jobs/get-list");
  return data;
};

export const submitRepo = async (
  jobId: number,
  repoUrl: string,
): Promise<SubmitApplicationResponse> => {
  const body: SubmitApplicationRequest = {
    uuid: UUID,
    jobId,
    candidateId: CANDIDATE_ID,
    repoUrl,
  };

  const { data } = await axiosInstance.post("/api/jobs/submit", body);

  return data;
};
