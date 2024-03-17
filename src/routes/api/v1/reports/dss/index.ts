import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/dss/explotacion';
import { log } from '@utils/logger';
import { Hono } from 'hono';

const app = new Hono();

app.get('/explotacion', async (req) => {
   try {
      const body = req.body;
      const response = await explotacion({
         ...(body as any),
         connectionString: config.db.DEV_CONNECTION_STRING,
      });
      if (response.error) {
         return req.json({
            error: response.error,
         });
      }
      return req.json({
         data: response.data?.results[0],
         success: true,
      });
   } catch (error: any) {
      log(error);
      return req.json({
         error: error.message,
      });
   }
});

export default app;
