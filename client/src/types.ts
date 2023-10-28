export type Ticket = {
  id: number;
  name: string;
  email: string;
  status: string;
  subject: string;
  description: string;
  created_at: string;
};

export type TicketTableProps = {
  tickets: Ticket[];
};
