import { TicketTableProps, Ticket } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function TicketTable({ tickets }: TicketTableProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'new' | 'pending' | 'resolved'
  >('all');

  const handleChangeFilter = (
    filter: 'all' | 'new' | 'pending' | 'resolved',
  ) => {
    setSelectedFilter(filter);
  };

  const statusFilters: Array<'all' | 'new' | 'pending' | 'resolved'> = [
    'all',
    'new',
    'pending',
    'resolved',
  ];

  const filteredTickets: Ticket[] = tickets.filter((ticket) => {
    if (selectedFilter === 'all') {
      return true;
    }
    return ticket.status === selectedFilter;
  });

  return (
    <div>
      <div className="my-4 flex space-x-4">
        {statusFilters.map((filter) => (
          <button
            key={filter}
            className={`flex-1 py-2 rounded-lg text-white ${
              selectedFilter === filter
                ? 'bg-blue-500'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={() => handleChangeFilter(filter)}
          >
            {filter === 'all' ? 'All' : filter}
          </button>
        ))}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Subject
            </th>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => {
            const createdAtDate = new Date(ticket.created_at);
            const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

            return (
              <tr key={uuidv4()}>
                <td className="px-6 py-4">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.name}</td>
                <td className="px-6 py-4">{ticket.email}</td>
                <td className="px-6 py-4">
                  {ticket.status === 'new' && (
                    <span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-blue-400"
                      />{' '}
                    </span>
                  )}
                  {ticket.status === 'pending' && (
                    <span title="Pending">
                      <FontAwesomeIcon
                        icon={faExclamationCircle}
                        className="text-yellow-500"
                      />
                    </span>
                  )}
                  {ticket.status === 'resolved' && (
                    <span title="Resolved">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-green-500"
                      />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{ticket.subject}</td>
                <td className="px-6 py-4">{formattedCreatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export { TicketTable };
