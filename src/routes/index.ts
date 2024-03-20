import packageJson from '@src/../package.json';
import api from './api';
import { Hono } from 'hono';
import admin from './admin';

const app = new Hono();
app.route('/api', api);
app.route('/admin', admin);
app.get('/health', async (req) => {
   return req.json({
      name: packageJson.name,
      version: packageJson.version,
   });
});

export default app;
