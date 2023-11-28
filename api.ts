import { ITicket } from "./types/ticket-interface";

const baseUrl = "http://localhost:5000";

export const getAllTickets = async (): Promise<ITicket[]> => {
  const res = await fetch(`${baseUrl}/tickets`, { cache: "no-store" });
  const tickets = await res.json();
  return tickets;
};

export const getTicketById = async (id: any) => {
  try {
    const res = await fetch(`${baseUrl}/tickets/${id}`, { cache: "no-store" });
    const ticket = await res.json();
    console.log('heyheyhey', ticket);
    
    
    return ticket;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${id}:`, error);
    throw new Error(`Failed to fetch ticket with ID ${id}`);
  }
}

export async function getServerSideProps({ params }: any) {
  const { id } = params;

  try {
    const item = await getTicketById(id);
    return {
      props: { item },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export const addTicket = async (ticket: ITicket): Promise<ITicket> => {
  const res = await fetch(`${baseUrl}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
  const newTicket = await res.json();
  return newTicket;
};

export const editTicket = async (ticket: ITicket): Promise<ITicket> => {
  const res = await fetch(`${baseUrl}/tickets/${ticket.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });
  const updatedTicket = await res.json();
  return updatedTicket;
};

export const deleteTicket = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tickets/${id}`, {
    method: "DELETE",
  });
};
