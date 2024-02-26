## Zealthy Ticketing Application

## Tech Used:

- Next.js
- React-hook-form - Form Library
- Tailwindcss
- Chartjs - Chart visualization
- Shadcn - Component Library
- Vercel/postgres - Database

## MVP

- Created a web app that has a ticket submission form and a backend that can drill into tickets to respond back to clients.
- Added simple observation for New, Pending, and Resolved tickets in admin dashboard.
- linked Vercel Postgres for database.

## Stretch Features

- Add client side log in so we can create better database structure. (currently just 1 table... inefficient but simple!)
- hash and salt emails for security
- Add admin login for security
  - Login will also create a way to who responded to which ticket
- Documentation.
- Testing.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- home page ('/') is the ticket submission form.
- admin page ('/admin') to check overview, new/pending tickets, and resolved tickets
