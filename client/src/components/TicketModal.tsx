import React from 'react';
import Modal from 'react-modal';
import { Ticket } from '../types';

interface TicketModalProps {
  ticket: Ticket;
  closeModal: () => void;
}

function TicketModal({ ticket, closeModal }: TicketModalProps) {
  return (
    <Modal
      isOpen={!!ticket}
      onRequestClose={closeModal}
      contentLabel="Ticket Modal"
      ariaHideApp={false}
    >
      <div className="modal-content">
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
        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
}

export default TicketModal;
