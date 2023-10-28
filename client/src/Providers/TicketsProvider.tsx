import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { Ticket } from 'src/types';

interface TicketsContextType {
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
}
const TicketsContext = createContext<TicketsContextType | undefined>(undefined);
interface TicketsProviderProps {
  children: ReactNode;
}
export function TicketsProvider({ children }: TicketsProviderProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    fetch('/api/tickets')
      .then((response) => response.json())
      .then((fetchedTickets: Ticket[]) => {
        const formattedTickets = fetchedTickets.map((ticket) => {
          const createdAtDate = new Date(ticket.created_at);
          const formattedCreatedAt = createdAtDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          });
          return { ...ticket, created_at: formattedCreatedAt };
        });
        setTickets(formattedTickets);
        console.log(tickets);
      });
  }, []);

  const contextValue = useMemo(
    () => ({
      tickets,
      setTickets,
      // useFiltered,
    }),
    [tickets],
  );

  return (
    <TicketsContext.Provider value={contextValue}>
      {children}
    </TicketsContext.Provider>
  );
}

export function useTickets() {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
}
