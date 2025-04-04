import type { APIRoute } from 'astro';
import { z } from 'zod';

export const prerender = false;

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const result = formSchema.safeParse(data);

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: result.error.errors[0].message }),
        { status: 400 }
      );
    }

    const response = await fetch("https://api.buttondown.email/v1/subscribers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${import.meta.env.BUTTONDOWN_API_KEY}`,
      },
      body: JSON.stringify({ email_address: result.data.email }),
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to subscribe. Please try again later." }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}