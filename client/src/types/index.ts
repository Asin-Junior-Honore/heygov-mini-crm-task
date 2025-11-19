export type Activity = {
  type: 'call' | 'email' | 'meeting' | 'note';
  notes?: string;
  timestamp: string;
  _id: string;
};

export type Contact = {
  _id: string;
  owner?: string;
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: string;
  username: string;
};
