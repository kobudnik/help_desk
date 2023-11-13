export type Ticket = {
  id: number;
  name: string;
  email: string;
  status: TicketStatus;
  subject: string;
  description: string;
  created_at: string;
  response: string | null;
};

export type TicketStatus = 'new' | 'in progress' | 'resolved';
