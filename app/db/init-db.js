import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function initDB() {
  try {
    const ticketStatusEnumExists = await sql`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'ticket_status'
      );
    `;

    if (!ticketStatusEnumExists[0].exists) {
      await sql`CREATE TYPE ticket_status AS ENUM ('New', 'Pending', 'Resolved');`;
    }

    await sql`CREATE TABLE IF NOT EXISTS Tickets (
      TicketID SERIAL PRIMARY KEY,
      Name varchar(255) NOT NULL,
      Email varchar(255) NOT NULL,
      Status ticket_status DEFAULT 'New',
      Message varchar(500),
      Response varchar(500),
      TicketDate timestamp DEFAULT CURRENT_TIMESTAMP,
      ResponseDate timestamp
    );`;


    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Error initializing database');
  }
}
