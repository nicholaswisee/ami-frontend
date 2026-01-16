export type LostFoundType = "LOST" | "FOUND";
export type LostFoundStatus = "REPORTED" | "AT_POST" | "CLAIMED";

export interface LostFoundReport {
  id: string;
  type: LostFoundType;
  itemType: string;
  specification: string;
  lostFoundTime: string;
  location: string;
  photoUrl?: string;
  status: LostFoundStatus;
  createdAt: string;
}

export interface CreateLostFoundReport {
  type: LostFoundType;
  itemType: string;
  specification: string;
  lostFoundTime: string;
  location: string;
  photoUrl?: string;
}
