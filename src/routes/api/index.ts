import { Hono } from 'hono';
import v1 from './v1';

const app = new Hono();
app.use(async (c, next) => {
   const start = Date.now();
   await next();
   const end = Date.now();
   console.log(`${c.req.path} time: ${end - start}ms`);
   c.res.headers.set('X-Response-Time', `${end - start}`);
});
app.route('/v1', v1);
app.get('/', async (req) => {
   return req.json({
      message: 'Welcome to the API',
   });
});
export default app;
