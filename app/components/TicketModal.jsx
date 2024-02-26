'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { updateTicket } from '@/app/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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

  useEffect(() => {
    if (ticket) {
      form.reset({
        status: ticket.status,
        response: '',
      });
    }
  }, [ticket, form]);
  const onSubmit = async (data) => {
    const updatedTicket = {
      ...ticket,
      status: data.status,
      response: data.response,
      responseDate: new Date().toISOString(),
    };
    try {
      const response = await updateTicket(updatedTicket);

      if (response.success) {
        if (data.status === 'Resolved') {
          console.log(
            'Would normally send email here with body:',
            data.response
          );
        } else {
          console.log('Ticket updated successfully');
        }
        onClose();
      } else {
        console.error('Error updating ticket:', response.message);
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xs:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] max-h-[900px] overflow-auto ">
        <DialogHeader>
          {ticket && ticket.status === 'Resolved' ? (
            <DialogTitle>Resolved Ticket</DialogTitle>
          ) : (
            <DialogTitle>Edit Ticket</DialogTitle>
          )}
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
                      onOpenChange={(open) => {
                        if (open) {
                          document.body.style.overflow = 'hidden';
                        } else {
                          document.body.style.overflow = 'hidden';
                        }
                      }}
                      onValueChange={field.onChange}
                      defaultValue={ticket.status}
                      disabled={ticket.status === 'Resolved'}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Status" {...field} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <p className="text-sm font-medium"> Ticket Message</p>
                <div className="flex h-36 border border-stone-200	w-full shadow-sm rounded-md">
                  <p className="text-left w-full break-all overflow-auto p-2 text-sm text-stone-500">
                    {ticket.message}
                  </p>
                </div>
              </div>
              {ticket.status === 'Resolved' ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Your Response</p>
                  <div className="flex h-36 border w-full">
                    <p className="text-left w-full break-all overflow-auto p-2 text-sm text-stone-500">
                      {ticket.response}
                    </p>
                  </div>
                </div>
              ) : (
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
                            className="text-left w-full break-all overflow-auto shadow-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="flex w-full justify-end">
                {ticket.status === 'Resolved' ? (
                  <Button type="button" onClick={onClose} className="shadow-sm">
                    Close
                  </Button>
                ) : (
                  <Button type="submit" className="shadow-sm">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
