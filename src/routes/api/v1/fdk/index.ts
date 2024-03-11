import express from 'express';
import currencies from '@src/lib/seven/queries/fdk/currencies';
import config from '@src/config';

const router = express.Router();

router.get('/currencies', async (_req, res) => {
   const response = await currencies({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      result: response.currencies,
      success: true,
   });
});

export default router;
