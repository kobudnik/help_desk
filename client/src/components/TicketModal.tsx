import { useState } from 'react';
import Modal from 'react-modal';
import { Ticket } from '../types';

interface TicketModalProps {
  ticket: Ticket;
  closeModal: () => void;
}

function TicketModal({ ticket, closeModal }: TicketModalProps) {
  const [response, setResponse] = useState('');
  const handleResponseChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  };

  const handleSendResponse = async () => {
    const requestBody = JSON.stringify({
      newStatus: 'resolved',
      id: ticket.id,
      response,
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
        console.log('Ticket status updated successfully.');
        return true;
      } else {
        console.error(
          'Failed to update ticket status:',
          response.status,
          response.statusText,
        );
        return false;
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false;
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
        <div className="flex flex-col items-center gap-4  mt-24">
          <h2>Ticket Details</h2>
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
          <div>
            <strong>Description:</strong> {ticket.description}
          </div>
          <div>
            <strong>Created At:</strong> {ticket.created_at}
          </div>

          {ticket.status !== 'resolved' && (
            <div className="response-area">
              <textarea
                rows={4}
                placeholder="Type your response here..."
                value={response}
                onChange={handleResponseChange}
                className="w-full"
              />
              <button onClick={handleSendResponse}>Send Response</button>
            </div>
          )}
          <button
            className=" px-20 py-8 bg-blue-950 hover:bg-blue-900 text-white rounded-xl"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

export { TicketModal };
