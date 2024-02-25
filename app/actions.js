'use server';

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function createTicket({ name, email, message }) {
  console.log('inside createTicket action', { name, email, message });

  try {
    const result = await sql`
      INSERT INTO Tickets (Name, Email, Message)
      VALUES (${name}, ${email}, ${message})
      RETURNING TicketID
    `;

    const ticketID = result.rows[0].ticketid;
    console.log(ticketID);
    // Return response with ticketID
    revalidatePath('/admin/current');
    return {
      message: `Ticket created successfully`,
      ticketID,
    };
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return { message: `Failed to create ticket: ${error.message}` };
  }
}

export async function getTickets() {
  try {
    const result = await sql`
    SELECT * FROM Tickets WHERE Status = 'New' OR Status = 'Pending'
    `;
    console.log(result.rows);
    revalidatePath('/admin/current');
    return result.rows;
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return [];
  }
}
