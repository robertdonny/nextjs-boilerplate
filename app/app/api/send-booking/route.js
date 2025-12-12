import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { name, email, service, message } = await req.json();

    await resend.emails.send({
      from: "Booking <onboarding@resend.dev>",
      to: "langleyandrew437@gmail.com",
      subject: `New Booking from ${name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to send email" }, { status: 500 });
  }
}
