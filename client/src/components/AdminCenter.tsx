import { TicketTable } from './TicketTable';
import { useTickets } from '../Providers/TicketsProvider';

function AdminCenter() {
  const { tickets } = useTickets();

  return (
    <div className="relative overflow-x-auto overflow-y-auto tableMax shadow-md sm:rounded-lg">
      {tickets && <TicketTable />}
    </div>
  );
}

export { AdminCenter };
