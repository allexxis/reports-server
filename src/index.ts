import { Hono } from 'hono';
import config from '@config/index';
import root from '@src/routes/index';
const app = new Hono();

app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404));

app.route('/', root);

console.log(`🚀Listening on http://localhost:${config.server.PORT}`);
export default app;
