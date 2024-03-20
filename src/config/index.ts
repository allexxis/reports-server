export default {
   server: {
      PORT: parseInt(process.env.PORT || '3000') || 3000,
      NODE_ENV: process.env.NODE_ENV || 'development',
      __PROD__: process.env.NODE_ENV === 'production',
      ADMIN_KEY: process.env.ADMIN_KEY,
   },
   db: {
      DEV_CONNECTION_STRING: process.env.DEV_CONNECTION_STRING || '',
   },
   clerk: {
      CLERK_JWT_KEY: process.env.CLERK_JWT_KEY || '',
      CLERK_ISSUER: process.env.CLERK_ISSUER || '',
   },
};
