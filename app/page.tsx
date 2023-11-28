import { getAllTickets, getTicketById } from "@/api";
import AddTicket from "./components/tickets/AddTicket";
import TicketList from "./components/tickets/TicketList";

export default async function Home() {
  const tickets = await getAllTickets();
  return (
    <main className="max-w-4xl mx-auto mt-4">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Task Management App</h1>
        <AddTicket />
      </div>
      <TicketList tickets={tickets} />
    </main>
  );
}
