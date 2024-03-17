import config from '@src/config';
import agencies from '@src/lib/seven/queries/fdk/agencies';
import currencies from '@src/lib/seven/queries/fdk/currencies';
import markets from '@src/lib/seven/queries/fdk/markets';
import prices from '@src/lib/seven/queries/fdk/prices';
import roomType from '@src/lib/seven/queries/fdk/room/type';
import roomUsage from '@src/lib/seven/queries/fdk/room/usage';
import { Hono } from 'hono';

const app = new Hono();

app.get('/currencies', async (req) => {
   const response = await currencies({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.currencies,
      success: true,
   });
});
app.get('/markets', async (req) => {
   const response = await markets({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.markets,
      success: true,
   });
});
app.get('/agencies', async (req) => {
   const response = await agencies({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.agencies,
      success: true,
   });
});
app.get('/prices', async (req) => {
   const response = await prices({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.prices,
      success: true,
   });
});
app.get('/rooms/type', async (req) => {
   const response = await roomType({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.rooms,
      success: true,
   });
});
app.get('/rooms/usage', async (req) => {
   const response = await roomUsage({
      connectionString: config.db.DEV_CONNECTION_STRING,
   });
   if (response.error) {
      return req.json({
         error: response.error,
      });
   }
   return req.json({
      data: response.rooms,
      success: true,
   });
});
export default app;
