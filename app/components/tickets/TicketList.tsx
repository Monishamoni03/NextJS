import { ITicket } from "@/types/ticket-interface";
import React from "react";
import Ticket from "./Ticket";

interface TicketListProps {
  tickets: ITicket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tickets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
