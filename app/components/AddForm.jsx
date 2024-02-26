'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function AddForm({ createTicket }) {
  const maxLength = 500;
  const [messageLength, setMessageLength] = useState(0);
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await createTicket(data);
      if (response.success) {
        console.log('Ticket created successfully:');
        router.push('/success');
      } else {
        console.error('Error creating ticket:', response.message);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value.slice(0, maxLength);
    setMessageLength(value.length);
    form.setValue('message', value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          rules={{ required: 'Name is needed' }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Input Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: 'Email is needed',
            pattern: { value: /^\S+@\S+\.\S+$/i, message: 'Input valid Email' },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Input Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          rules={{ required: { value: true, message: 'Message is needed' } }}
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between pt-1">
                <FormLabel>Your Message</FormLabel>
                <FormLabel>
                  Remaining Characters: {maxLength - messageLength}
                </FormLabel>
              </div>
              <FormControl>
                <div className="grid w-full gap-2">
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    rows="5"
                    maxLength={maxLength}
                    onChange={handleChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    Your message will be sent to the support team.
                  </p>
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
  );
}
