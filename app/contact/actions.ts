'use server';

import { z } from 'zod';
import { PROBLEMS } from '@/content/problems';

const problemTitles = [
  PROBLEMS[0].title,
  ...PROBLEMS.slice(1).map((p) => p.title),
  'Something else',
] as [string, ...string[]];

const ContactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('A valid email address is required'),
  problem: z.enum(problemTitles, {
    errorMap: () => ({ message: 'Please select a problem from the list' }),
  }),
  message: z
    .string()
    .trim()
    .min(1, 'Please describe what is happening')
    .max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
});

export type ContactFormState = {
  success?: boolean;
  errors?: Record<string, string>;
  message?: string;
};

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      success: false,
      message: 'Something went wrong. Try again or use the links above.',
    };
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    problem: formData.get('problem'),
    message: formData.get('message'),
    honeypot: formData.get('website') || '',
  };

  const parsed = ContactFormSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
    return {
      success: false,
      errors,
    };
  }

  const data = parsed.data;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `New problem inquiry from ${data.name}: ${data.problem}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nProblem: ${data.problem}\n\nWhat's happening:\n${data.message}`,
      }),
    });

    if (!res.ok) {
      return {
        success: false,
        message: 'Something went wrong. Try again or use the links above.',
      };
    }

    return {
      success: true,
      message: 'Message sent.',
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Try again or use the links above.',
    };
  }
}
