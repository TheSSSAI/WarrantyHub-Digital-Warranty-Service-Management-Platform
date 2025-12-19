import { registerAs } from '@nestjs/config';

export default registerAs('communicationServices', () => ({
  connectionString: process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
  senderEmail: process.env.ACS_SENDER_EMAIL || 'noreply@warrantyhub.com',
  senderName: process.env.ACS_SENDER_NAME || 'WarrantyHub Notifications',
  smsPhoneNumber: process.env.ACS_SMS_PHONE_NUMBER,
}));