import packageJson from '@src/../package.json';
import api from './api';
import { Hono } from 'hono';
import admin from './admin';

const app = new Hono();
app.use(async (c, next) => {
   const startTime = Date.now();
   await next();
   console.log(`Path: ${c.req.path} Time: ${Date.now() - startTime}ms`);
});
app.route('/api', api);
app.route('/admin', admin);
app.get('/health', async (req) => {
   return req.json({
      name: packageJson.name,
      version: packageJson.version,
   });
});

export default app;
