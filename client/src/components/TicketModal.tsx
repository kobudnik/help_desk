import { useState } from 'react';
import Modal from 'react-modal';
import { Ticket } from '../types';
import { useTickets } from '../Providers/TicketsProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface TicketModalProps {
  ticket: Ticket;
  closeModal: () => void;
}

function TicketModal({ ticket, closeModal }: TicketModalProps) {
  const [reply, setReply] = useState<string>('');
  const [sentStatus, setSentStatus] = useState<boolean>(false);
  const { tickets, setTickets } = useTickets();
  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  const handleSendResponse = async (updatedStatus: string) => {
    const requestBody = JSON.stringify({
      newStatus: 'resolved',
      id: ticket.id,
      response: reply.length > 0 ? reply : null,
    });
    try {
      const response = await fetch('/api/tickets', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      if (response.ok) {
        const newState = [...tickets].map((el) => {
          if (el.id === ticket.id) {
            return { ...el, status: updatedStatus, response: reply };
          } else {
            return el;
          }
        });
        setTickets(newState);
        setSentStatus(true);
        setReply('');
        return;
      } else {
        console.error(
          'Failed to update ticket status:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  return (
    <Modal
      isOpen={!!ticket}
      onRequestClose={closeModal}
      contentLabel="Ticket Modal"
      ariaHideApp={false}
    >
      <div className="modal-content text-blue-800">
        <FontAwesomeIcon
          icon={faTimes}
          className="absolute top-4 right-4 cursor-pointer close-icon text-3xl hover:text-blue-500"
          onClick={closeModal}
        />
        {ticket.status === 'new' && (
          <button
            className=" px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl"
            onClick={() => handleSendResponse('in progress')}
          >
            Mark Pending
          </button>
        )}
        <div className="flex flex-col items-center gap-4  mt-8">
          <h1 className="text-3xl">
            <strong>Ticket Details </strong>{' '}
          </h1>
          <div>
            <strong>ID:</strong> {ticket.id}
          </div>
          <div>
            <strong>Name:</strong> {ticket.name}
          </div>
          <div>
            <strong>Email:</strong> {ticket.email}
          </div>
          <div>
            <strong>Status:</strong> {ticket.status}
          </div>
          <div>
            <strong>Subject:</strong> {ticket.subject}
          </div>
          <strong>Description: {ticket.description}</strong>
          <div>
            <strong>Created At:</strong> {ticket.created_at}
          </div>
          {ticket.response !== null && (
            <div>
              {' '}
              <strong>Reply: </strong>
              {ticket.response}{' '}
            </div>
          )}
          {ticket.status !== 'resolved' && (
            <div className="response-area  w-full">
              <div className="flex justify-center">
                <textarea
                  rows={3}
                  placeholder="Type your response here."
                  value={reply}
                  onChange={handleResponseChange}
                  className=" w-1/2 p-2.5 rounded-xl text-white bg-gray-700 border-gray-600  focus:ring-2 focus:border-1 focus:ring-blue-500 focus:border-blue-50"
                />
              </div>
              {reply.length > 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => handleSendResponse('resolved')}
                    className=" block px-20 py-6 mt-4 bg-blue-950 hover:bg-blue-900 text-white rounded-xl"
                  >
                    Reply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {sentStatus && (
        <div className="flex justify-center">
          <strong className="text-green-500 text-2xl mt-4"> Success! </strong>
        </div>
      )}
    </Modal>
  );
}

export { TicketModal };
