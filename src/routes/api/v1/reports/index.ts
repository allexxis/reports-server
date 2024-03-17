import { Hono } from 'hono';
import dss from './dss';

const app = new Hono();

app.route('/dss', dss);
export default app;
