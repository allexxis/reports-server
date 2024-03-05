import { Elysia } from 'elysia';
import packageJson from '@src/../package.json';

const routes = (app: Elysia) => {
   app.get('/health', () => {
      return {
         status: 'ok',
         version: packageJson.version,
      };
   });
};
export default routes as any;
