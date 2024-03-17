import packageJson from '@src/../package.json';
import { executeProcedure } from '@lib/seven';
import config from '@src/config';
import api from './api';
import { Hono } from 'hono';

const app = new Hono();

app.route('/api', api);
app.get('/health', async (req) => {
   return req.json({
      name: packageJson.name,
      version: packageJson.version,
   });
});
app.get('/test', async (req) => {
   if (config.server.__PROD__) {
      return req.status(404);
   }
   console.time('executeProcedure');
   const response = await executeProcedure(
      config.db.DEV_CONNECTION_STRING,
      'dbo.GetSimpleTable',
      undefined,
      'HG_SevenFront'
   ).catch((err) => {
      return { error: err };
   });
   console.timeEnd('executeProcedure');
   return req.json({
      data: response as any,
      success: true,
   });
});

export default app;
