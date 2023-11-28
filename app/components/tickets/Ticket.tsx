"use client";

import { deleteTicket, editTicket } from "@/api";
import { ITicket } from "@/types/ticket-interface";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2, FiUserPlus } from "react-icons/fi";
import Modal from "../modal/Modal";

interface TicketProps {
  ticket: ITicket;
}

const Ticket: React.FC<TicketProps> = ({ ticket }) => {
  const router = useRouter();
  const [openModalAssign, setOpenModalAssign] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [ticketToEdit, setTicketToEdit] = useState<string>(ticket.text);
  const [selectedUser, setSelectedUser] = useState<string>('');

  const handleSubmitEditTicket: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    if (ticketToEdit !== "") {
      await editTicket({
        id: ticket.id,
        text: ticketToEdit,
      });
      setOpenModalEdit(false);
      router.refresh();
    } else {
      alert("Ticket name cannot be empty.");
    }
  };

  const handleDeleteTicket = async (id: string) => {
    await deleteTicket(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  const handleAssignTicket = async () => {
    if (selectedUser !== '') {
      setOpenModalAssign(false);
    } else {
      alert('Please select a user to assign the ticket.');
    }
  };

  return (
    <tr key={ticket.id}>
      <td className="w-full">{ticket.text}</td>
      <td className="flex gap-5">
        <FiUserPlus
          onClick={() => setOpenModalAssign(true)}
          cursor="pointer"
          className="text-yellow-500"
          size={25}
        />
        <Modal modalOpen={openModalAssign} setModalOpen={setOpenModalAssign}>
          <h3 className="text-lg">
            Assigning this ticket
          </h3>
          <div className="modal-action">
          <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="input input-bordered w-full"
            >
              <option value="">Select User</option>
              <option value="user1">Kaviya</option>
              <option value="user2">Madhu</option>
              <option value="user2">Sanjay</option>
            </select>
            <button onClick={handleAssignTicket} className="btn">
              Assign
            </button>
          </div>
        </Modal>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTicket}>
            <h3 className="font-bold text-lg">Edit ticket</h3>
            <div className="modal-action">
              <input
                value={ticketToEdit}
                onChange={(e) => setTicketToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this ticket?
          </h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTicket(ticket.id)}
              className="btn"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Ticket;
