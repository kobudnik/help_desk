import { TicketTable } from './TicketTable';
import { Ticket } from 'src/types';
import { useEffect, useState } from 'react';

function AdminCenter() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  useEffect(() => {
    fetch('/api/tickets')
      .then((response) => response.json())
      .then((tickets) => {
        setTickets(tickets);
      });
  }, []); //
  return (
    <div className="relative overflow-x-auto overflow-y-auto tableMax shadow-md sm:rounded-lg">
      {tickets && <TicketTable tickets={tickets} />}
    </div>
  );
}

export { AdminCenter };
