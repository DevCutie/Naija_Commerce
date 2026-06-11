'use server';

import { type ContactFormValues, contactFormSchema } from '@/lib/validations';

export async function submitContactForm(data: ContactFormValues) {
	const parsed = contactFormSchema.safeParse(data);

	if (!parsed.success) {
		return {
			success: false,
			error: 'Invalid form submission. Please check your inputs and try again.',
		};
	}
	await new Promise((resolve) => setTimeout(resolve, 2000));

	console.log('SECURE SERVER LOG - Email to send:', parsed.data);

	return { success: true, message: 'Your message has been sent successfully!' };
}
