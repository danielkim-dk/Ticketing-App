import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const createStatus =
      await sql`CREATE TYPE ticket_status AS ENUM ('New', 'Pending', 'Resolved');`;

    const createUserTable = await sql`CREATE TABLE IF NOT EXISTS Users (
      UserID SERIAL PRIMARY KEY,
      Name varchar(255) NOT NULL,
      Email varchar(255) NOT NULL UNIQUE
    );`;

    const createTicketTable = await sql`CREATE TABLE IF NOT EXISTS Tickets (
      TicketID SERIAL PRIMARY KEY,
      UserID int,
      Status ticket_status,
      Message varchar(500),
      Response varchar(500),
      TicketDate timestamp DEFAULT CURRENT_TIMESTAMP,
      ResponseDate timestamp,
      FOREIGN KEY (UserID) REFERENCES Users(UserID)
    );`;

    console.log('Tables created successfully');

    return NextResponse.json(
      { createStatus, createUserTable, createTicketTable },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
