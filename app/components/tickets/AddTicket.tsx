"use client";

import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "../modal/Modal";
import { addTicket } from "@/api";
import { v4 as uuidv4 } from "uuid";

const AddTicket = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTicket, setNewTicket] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (newTicket !== "") {
      await addTicket({
        id: uuidv4(),
        text: newTicket,
      });
      setNewTicket("");
      setModalOpen(false);
      router.refresh();
    } else {
      alert("Please enter the ticket name.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-right"
      >
        <AiOutlinePlus className="ml-2" size={18} />Ticket
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new ticket</h3>
          <div className="modal-action">
            <input
              value={newTicket}
              onChange={(e) => setNewTicket(e.target.value)}
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
    </div>
  );
};

export default AddTicket;
