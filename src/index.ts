import { Elysia } from 'elysia';
import config from '@config/index';
import routes from './routes';

const app = new Elysia();
app.use(routes);
app.listen(config.PORT);

console.log(
   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
