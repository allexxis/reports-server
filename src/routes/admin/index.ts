import { Context, Hono } from 'hono';
import config from '@src/config';
import { set } from '@lib/redis';

type AdminAction = 'set' | 'get' | 'delete';
const app = new Hono();

app.use(async (c: Context, next) => {
   const key = c.req.header('key');
   if (!key || key.trim() === '') {
      return c.json({ ok: false, error: 'Key not found' }, 401);
   }
   if (key !== config.server.ADMIN_KEY) {
      return c.json({ ok: false, error: 'Invalid Key' }, 401);
   }
   await next();
});
app.get('/', async (c: Context) => {
   return c.json({ ok: true, data: 'super' });
});
app.post('/', async (c: Context) => {
   const body = await c.req.json();

   const action: AdminAction = body.action;
   if (!action) {
      return c.json({ ok: false, error: 'Action not found' }, 400);
   }
   if (action === 'set') {
      const data = body.data;
      if (!data) {
         return c.json({ ok: false, error: 'Data not found' }, 400);
      }
      const key = body.key;
      if (!key) {
         return c.json({ ok: false, error: 'Key not found' }, 400);
      }
      const result = await set(key, data);
      return c.json({ ok: true, data: result });
   }
   return c.json({ ok: true, data: action });
});

export default app;
