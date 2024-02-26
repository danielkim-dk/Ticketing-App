const { sql } = require('@vercel/postgres');

async function initDB() {
  try {
    const ticketStatusEnumExists = await sql`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'ticket_status'
      );
    `;

    if (!ticketStatusEnumExists[0].exists) {
      await sql`CREATE TYPE ticket_status AS ENUM ('New', 'In Progress', 'Resolved');`;
    }

    await sql`CREATE TABLE IF NOT EXISTS Tickets (
      TicketID SERIAL PRIMARY KEY,
      Name varchar(255) NOT NULL,
      Email varchar(255) NOT NULL,
      Status ticket_status DEFAULT 'New',
      Message varchar(500),
      Response varchar(2000),
      TicketDate timestamp DEFAULT CURRENT_TIMESTAMP,
      ResponseDate timestamp
    );`;

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw new Error('Error initializing database');
  }
}

initDB().catch((error) => {
  console.error('Error initializing database:', error);
  process.exit(1);
});

module.exports = { initDB };
