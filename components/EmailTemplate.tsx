import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { CONFIG } from '@/utils/config';

interface InvoiceEmailProps {
    orderId: string;
    customerName: string;
    deviceModel: string;
    imei: string;
    serviceName: string;
    amount: string;
    timestamp: string;
}

export const InvoiceEmail = ({
    orderId,
    customerName,
    deviceModel,
    imei,
    serviceName,
    amount,
    timestamp,
}: InvoiceEmailProps) => (
    <Html>
        <Head />
        <Preview>Your iUnlock Hub Invoice - Order #{orderId}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={title}>iUnlock Hub</Heading>
                    <Text style={subtitle}>Premium Device Unlocking Services</Text>
                </Section>
                <Section style={section}>
                    <Text style={text}>Hello {customerName},</Text>
                    <Text style={text}>
                        Thank you for your order! Your payment confirmation has been received, and our technicians have been notified.
                    </Text>
                    <Hr style={hr} />
                    <Heading style={heading}>Order Details</Heading>
                    <Section style={detailsSection}>
                        <Text style={detailText}><strong>Order ID:</strong> {orderId}</Text>
                        <Text style={detailText}><strong>Date:</strong> {timestamp}</Text>
                        <Text style={detailText}><strong>Service:</strong> {serviceName}</Text>
                        <Text style={detailText}><strong>Device:</strong> {deviceModel}</Text>
                        <Text style={detailText}><strong>IMEI/Serial:</strong> {imei}</Text>
                        <Text style={detailText}><strong>Amount Paid:</strong> ${amount}</Text>
                    </Section>
                    <Hr style={hr} />
                    <Text style={text}>
                        <strong>What's Next?</strong>
                    </Text>
                    <Text style={text}>
                        A technician will review your order and contact you via WhatsApp or Email within 24 hours to begin the unlocking process.
                        Please ensure your device is connected to a Windows PC with the required software installed (3uTools, UltraViewer).
                    </Text>
                    <Section style={buttonContainer}>
                        <Link href={`https://wa.me/${CONFIG.business.whatsapp.replace('+', '')}`} style={button}>
                            Chat with Support on WhatsApp
                        </Link>
                    </Section>
                    <Text style={footerText}>
                        If you have any questions, reply to this email or contact us at {CONFIG.business.email}
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

const main = {
    backgroundColor: '#000000',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
};

const header = {
    backgroundColor: '#dc2626',
    padding: '40px',
    textAlign: 'center' as const,
    borderRadius: '12px 12px 0 0',
};

const title = {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0',
    textTransform: 'uppercase' as const,
};

const subtitle = {
    color: '#ffcccc',
    fontSize: '14px',
    margin: '8px 0 0',
};

const section = {
    backgroundColor: '#171717',
    padding: '40px',
    borderRadius: '0 0 12px 12px',
    border: '1px solid #262626',
};

const text = {
    color: '#d4d4d4',
    fontSize: '16px',
    lineHeight: '24px',
};

const heading = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '24px 0 16px',
};

const detailsSection = {
    backgroundColor: '#262626',
    padding: '20px',
    borderRadius: '8px',
};

const detailText = {
    color: '#ffffff',
    fontSize: '14px',
    margin: '8px 0',
};

const hr = {
    borderColor: '#262626',
    margin: '24px 0',
};

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '32px 0',
};

const button = {
    backgroundColor: '#25D366',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
};

const footerText = {
    color: '#737373',
    fontSize: '12px',
    lineHeight: '18px',
    textAlign: 'center' as const,
    marginTop: '32px',
};
