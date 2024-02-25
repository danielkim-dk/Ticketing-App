import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { createTicket } from '@/app/actions';
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { sql } from '@vercel/postgres';

const AddTicketForm = () => {
  async function createTicket(formData) {
    'use server';

    console.log('inside createTicket action', formData);
    try {
      const data = [
        formData.get('Name'),
        formData.get('Email'),
        formData.get('Message'),
      ];
      console.log(data);
      await sql`
        INSERT INTO Users (Name, Email) VALUES (${data[0]}, ${data[1]}) RETURNING UserID`;

      return {
        message: `Ticket created successfully`,
      };
    } catch (e) {
      return { message: 'Failed to create Ticket' };
    }
  }
  return (
    <div>
      <form
        action={createTicket}
        className="flex flex-col gap-5 border p-5 shadow-lg bg-white my-10"
      >
        <label htmlFor=""> Your Name</label>
        <Input required type="text" name="Name" />
        <label htmlFor=""> Your Email</label>
        <Input required type="email" name="Email" />
        <label htmlFor=""> Your Message</label>
        <Textarea required type="text" name="Message" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddTicketForm;
