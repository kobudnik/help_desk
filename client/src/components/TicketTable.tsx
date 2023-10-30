import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TicketModal } from './TicketModal';
import {
  faCircle,
  faCheck,
  faExclamationCircle,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { Ticket } from 'src/types';
import { useTickets } from '../Providers/TicketsProvider';

type FilterOptions = 'all' | 'new' | 'in progress' | 'resolved';
type SortOptions = 'newest' | 'oldest';

function TicketTable() {
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('all');
  const [sortOrder, setSortOrder] = useState<SortOptions>('newest');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { tickets } = useTickets();

  const openModal = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const handleChangeFilter = (filter: FilterOptions) => {
    setSelectedFilter(filter);
  };

  const statusFilters: FilterOptions[] = [
    'all',
    'new',
    'in progress',
    'resolved',
  ];

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
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      className=" ml-1 text-md"
                    />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className=" ml-1 text-md"
                    />
                  </span>
                )}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.map((ticket) => {
            return (
              <tr
                key={uuidv4()}
                onClick={() => {
                  openModal(ticket);
                }}
                className="hover:bg-gray-900 cursor-pointer"
              >
                <td className="px-6 py-4">{ticket.id}</td>
                <td className="px-6 py-4">{ticket.name}</td>
                <td className="px-6 py-4">{ticket.email}</td>
                <td className="px-6 py-4">
                  {ticket.status === 'new' && (
                    <span>
                      <FontAwesomeIcon
                        icon={faCircle}
                        className=" block  pl-4 text-blue-300"
                      />{' '}
                    </span>
                  )}
                  {ticket.status === 'in progress' && (
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="block  pl-4 text-yellow-500"
                    />
                  )}
                  {ticket.status === 'resolved' && (
                    <span title="Resolved">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="block  pl-4 text-green-500"
                      />
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">{ticket.subject}</td>
                <td className="px-6 py-4">{ticket.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {selectedTicket && (
        <TicketModal ticket={selectedTicket} closeModal={closeModal} />
      )}
    </div>
  );
}

export { TicketTable };
