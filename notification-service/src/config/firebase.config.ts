import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => {
  // Validate critical configuration presence
  if (!process.env.FIREBASE_PROJECT_ID && process.env.NODE_ENV === 'production') {
    throw new Error('FIREBASE_PROJECT_ID is missing in production environment configuration');
  }

  return {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    databaseUrl: process.env.FIREBASE_DATABASE_URL,
    tokenUri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
  };
});