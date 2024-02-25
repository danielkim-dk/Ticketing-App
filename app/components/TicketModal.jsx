import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function TicketModal({ isOpen, onClose, ticket }) {
  const form = useForm();

  function onSubmit(data) {
    if (data.status === 'new') {
      console.log('Saving status as new', data);
    }
    if (data.status === 'pending') {
      console.log('Saving status as pending', data);
    }
    if (data.status === 'resolved') {
      console.log(
        'Saving status as resolved and sending email with body: ',
        data.response
      );
    }
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xs:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] max-h-[900px] overflow-auto ">
        <DialogHeader>
          <DialogTitle>Edit Ticket</DialogTitle>
          <DialogDescription>
            Ticket Number: {ticket && ticket.ticketid}
          </DialogDescription>
        </DialogHeader>
        {ticket && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={ticket.status}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" {...field} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h1> Ticket Message</h1>
                <div className="flex h-36 border-2 w-full">
                  <p>{ticket.message}</p>
                </div>
              </div>
              <FormField
                control={form.control}
                name="response"
                rules={{
                  required: { value: true, message: 'Message is needed' },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Response</FormLabel>
                    <FormControl>
                      <div className="grid w-full gap-2">
                        <Textarea
                          placeholder="Type your response here."
                          {...field}
                          rows="5"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full justify-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
