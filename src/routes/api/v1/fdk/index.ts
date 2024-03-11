import config from '@src/config';
import currencies from '@src/lib/seven/queries/fdk/currencies';
import express from 'express';
import markets from '@src/lib/seven/queries/fdk/markets';
import agencies from '@src/lib/seven/queries/fdk/agencies';
import prices from '@src/lib/seven/queries/fdk/prices';
import roomType from '@src/lib/seven/queries/fdk/room/type';
import roomUsage from '@src/lib/seven/queries/fdk/room/usage';
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
router.get('/agencies', async (_req, res) => {
   const response = await agencies({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      data: response.agencies,
      success: true,
   });
});
router.get('/prices', async (_req, res) => {
   const response = await prices({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      data: response.prices,
      success: true,
   });
});
router.get('/rooms/type', async (_req, res) => {
   const response = await roomType({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      data: response.rooms,
      success: true,
   });
});
router.get('/rooms/usage', async (_req, res) => {
   const response = await roomUsage({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      data: response.rooms,
      success: true,
   });
});
export default router;
