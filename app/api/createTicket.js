import { NextApiRequest, NextApiResponse } from 'next';
import { createTicket } from '@/app/actions'; // Assuming `createTicket` is defined elsewhere

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body; // Access form data from request body
      const response = await createTicket({ name, email, message });
      res.status(200).json(response);
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ message: 'Failed to create ticket' });
    }
  } else {
    res.status(405).end('Method not allowed');
  }
}
