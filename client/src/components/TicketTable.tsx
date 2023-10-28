import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faExclamationCircle,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { TicketTableProps, Ticket } from 'src/types';

type FilterOptions = 'all' | 'new' | 'pending' | 'resolved';
type SortOptions = 'newest' | 'oldest';

function TicketTable({ tickets }: TicketTableProps) {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('all');
  const [sortOrder, setSortOrder] = useState<SortOptions>('newest');

  const handleChangeFilter = (filter: FilterOptions) => {
    setSelectedFilter(filter);
  };

  const statusFilters: FilterOptions[] = ['all', 'new', 'pending', 'resolved'];

  const filteredTickets: Ticket[] = tickets
    .filter((ticket) => {
      return selectedFilter === 'all' || ticket.status === selectedFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    });

  const handleSortChange = (order: SortOptions) => {
    setSortOrder(order);
  };

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
            {filter[0].toUpperCase() + filter.slice(1)}
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
              Created At{' '}
              <button
                onClick={() =>
                  handleSortChange(sortOrder === 'newest' ? 'oldest' : 'newest')
                }
              >
                {sortOrder === 'newest' ? (
                  <span className="text-green-500">
                    <FontAwesomeIcon icon={faArrowDown} />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <FontAwesomeIcon icon={faArrowUp} />
                  </span>
                )}
              </button>
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
                        className=" block  pl-4 text-blue-300"
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
