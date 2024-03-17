import { Hono } from 'hono';
import v1 from './v1';

const app = new Hono();
app.route('/v1', v1);
app.get('/', async (req) => {
   return req.json({
      message: 'Welcome to the API',
   });
});
export default app;
