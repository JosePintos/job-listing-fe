export type SubmitApplicationRequest = {
  uuid: string;
  jobId: number;
  candidateId: string;
  repoUrl: string;
  applicationId: string;
};

export type SubmitApplicationResponse = {
  ok: boolean;
};
