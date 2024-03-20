export default {
   server: {
      PORT: parseInt(process.env.PORT || '3000') || 3000,
      NODE_ENV: process.env.NODE_ENV || 'development',
      __PROD__: process.env.NODE_ENV === 'production',
   },
   db: {
      DEV_CONNECTION_STRING: process.env.DEV_CONNECTION_STRING || '',
   },
};
