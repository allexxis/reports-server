import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/dss/explotacion';

import { log } from '@utils/logger';
import { Hono } from 'hono';
import createReportResponse from '@src/utils/createReportResponse';
import { translations, filters } from './constant';
const app = new Hono();

app.post('/explotacion', async (c) => {
   const params = c.req.query();
   if (params.filters === 'true') {
      return c.json({ ok: true, data: { filters } });
   }
   try {
      const body = await c.req.json();
      const context = c.get('ctx');

      const response = await explotacion({
         ...body,
         ctx: context,
         dbConfig: config.db.DEV_CONNECTION_STRING,
      });
      if (response.error) {
         return c.json({
            error: response.error,
         });
      }
      const result = createReportResponse(
         response.data?.results,
         translations,
         { hotel: response.data?.hotel }
      );

      return c.json({
         data: result,
         ok: true,
      });
   } catch (error: any) {
      log(error);
      return c.json({
         error: error.message,
      });
   }
});

export default app;
