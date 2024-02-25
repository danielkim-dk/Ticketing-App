import { sql } from '@vercel/postgres';

export default async function POST(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Extract form data from request body
    const { Name, Email, Message } = await req.body;

    const values = [Name, Email, Message];

    // Start a transaction
    await sql.begin(async (sql) => {
      // Insert into Users table and get the generated UserID
      const userResult = await sql`
        INSERT INTO Users (Name, Email)
        VALUES (${values[0]}, ${values[1]})
        RETURNING UserID
      `;

      const userID = userResult[0].UserID;

      // Insert into Tickets table using the generated UserID
      const ticketResult = await sql`
        INSERT INTO Tickets (UserID, Message, Status)
        VALUES (${userID}, ${values[2]}, 'New')
        RETURNING TicketID
      `;

      // Log success message with ticket ID
      console.log(`Ticket created successfully: ${ticketResult[0].TicketID}`);

      // Send success response with ticket ID
      res.status(201).json({
        message: 'Ticket created successfully',
        ticketId: ticketResult[0].TicketID,
      });
    });
  } catch (error) {
    console.error('Failed to create Ticket:', error);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
}
