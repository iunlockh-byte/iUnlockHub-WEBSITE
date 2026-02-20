import { Resend } from 'resend';
import { InvoiceEmail } from '@/components/EmailTemplate';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            orderId,
            customerName,
            customerEmail,
            deviceModel,
            imei,
            serviceName,
            amount,
            timestamp
        } = body;

        if (!process.env.RESEND_API_KEY) {
            console.warn('RESEND_API_KEY is missing. Email skipped.');
            return NextResponse.json({ success: true, message: 'API key missing, logged to console' });
        }

        const data = await resend.emails.send({
            from: 'iUnlock Hub <onboarding@resend.dev>', // You can update this to your domain later
            to: [customerEmail, 'iunlockh@gmail.com'], // Send to both customer and business
            subject: `Invoice - iUnlock Hub Order #${orderId}`,
            react: InvoiceEmail({
                orderId,
                customerName,
                deviceModel,
                imei,
                serviceName,
                amount,
                timestamp
            }),
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ error });
    }
}
