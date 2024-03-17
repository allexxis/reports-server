import { Hono } from 'hono';
import fdk from './fdk';
import reports from './reports';

const app = new Hono();

app.route('/fdk', fdk);
app.route('/reports', reports);

export default app;
