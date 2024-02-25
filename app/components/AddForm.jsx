'use client';
import { useFormState } from 'react-dom';
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
      // Handle response (e.g., display success message)
      console.log('Ticket created successfully:', response);
      router.push('/success');
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* <form action={createTicket} className="w-2/3 space-y-6"> */}
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
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <div className="grid w-full gap-2">
                  <Textarea
                    placeholder="Type your message here."
                    {...field}
                    rows="5"
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

// async function onSubmit(data) {
//   try {
//     const response = await fetch('/api/create-ticket', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to submit form');
//     }

//     const { message, ticketId } = await response.json();
//     console.log(message, ticketId); // Handle success message and ticket ID

//     // Reset form or redirect to success page
//     router.push('/success');
//   } catch (error) {
//     console.error('Error submitting form:', error);
//     // Handle errors here
//   }
// }
