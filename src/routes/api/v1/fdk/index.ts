import config from '@src/config';
import currencies from '@src/lib/seven/queries/fdk/currencies';
import express from 'express';
import markets from '@src/lib/seven/queries/fdk/markets';
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
      data: response.currencies,
      success: true,
   });
});
router.get('/markets', async (_req, res) => {
   const response = await markets({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      data: response.markets,
      success: true,
   });
});
export default router;
