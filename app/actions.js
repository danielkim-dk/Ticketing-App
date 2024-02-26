'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';

export async function createTicket({ name, email, message }) {
  try {
    const result = await sql`
      INSERT INTO Tickets (Name, Email, Message)
      VALUES (${name}, ${email}, ${message})
      RETURNING TicketID
    `;

    const ticketID = result.rows[0].ticketid;
    revalidatePath('/admin/current');
    revalidatePath('/admin');
    return {
      success: true,
      message: `Ticket created successfully`,
      ticketID,
    };
  } catch (error) {
    console.error('Failed to create ticket:', error);
    return {
      success: false,
      message: `Failed to create ticket: ${error.message}`,
    };
  }
}

export async function getTickets() {
  try {
    const result = await sql`
    SELECT * FROM Tickets WHERE Status = 'New' OR Status = 'Pending'
    `;

    if (result.rows.length > 0) {
      revalidatePath('/admin/current');
    }

    return result.rows;
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return [];
  }
}

export async function updateTicket({
  ticketid,
  status,
  response,
  responseDate,
}) {
  try {
    const result = await sql`
      UPDATE Tickets
      SET Status = ${status}, Response = ${response}, ResponseDate = ${responseDate}
      WHERE TicketID = ${ticketid}
      RETURNING *
    `;

    const updatedTicket = result.rows[0];
    revalidatePath('/admin/current');
    revalidatePath('/admin/resolved');
    revalidatePath('/admin');
    return {
      success: true,
      message: `Ticket updated successfully`,
      updatedTicket,
    };
  } catch (error) {
    console.error('Failed to update ticket:', error);
    return {
      success: false,
      message: `Failed to update ticket: ${error.message}`,
    };
  }
}

export async function getResolvedTickets() {
  try {
    const result = await sql`
      SELECT * FROM Tickets WHERE Status = 'Resolved'
    `;

    if (result.rows[0].length > 0) {
      revalidatePath('/admin/resolved');
    }

    return result.rows;
  } catch (error) {
    console.error('Failed to get tickets:', error);
    return [];
  }
}

export async function getTicketCounts() {
  try {
    const result = await sql`
      SELECT Status, COUNT(*) AS Count
      FROM Tickets
      GROUP BY Status
    `;

    const counts = result.rows.reduce((acc, row) => {
      acc[row.status] = row.count;
      return acc;
    }, {});

    if (Object.keys(counts).length > 0) {
      revalidatePath('/admin');
    }

    return {
      success: true,
      counts,
    };
  } catch (error) {
    console.error('Failed to get ticket counts:', error);
    return {
      success: false,
      message: `Failed to get ticket counts: ${error.message}`,
    };
  }
}
