export type User = {
  id: string;
  email: string;
  name: string;
  role: "USER" | "SCANNER";
};

export type ParticipantCounts = {
  total: number;
  pending: number;
  confirmed: number;
  talkshow: {
    total: number;
    session1: number;
    session2: number;
  };
};
