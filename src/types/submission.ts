export type SubmitApplicationRequest = {
  uuid: string;
  jobId: number;
  candidateId: string;
  repoUrl: string;
};

export type SubmitApplicationResponse = {
  ok: boolean;
};
