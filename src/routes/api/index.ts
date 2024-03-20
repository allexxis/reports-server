import { Context, Hono } from 'hono';
import v1 from './v1';
import clerk from '@clerk/clerk-sdk-node';
import config from '@src/config';
import User from '@src/lib/user';
const app = new Hono();

const tokenValidation = async (ctx: Context) => {
   let token = ctx.req.header('Authorization');
   if (!token || token.trim() === '') {
      return undefined;
   }
   token = token.split('Bearer ')[1];
   const clerkClaims = await clerk
      .verifyToken(token, {
         jwtKey: config.clerk.CLERK_JWT_KEY,
         issuer: config.clerk.CLERK_ISSUER,
      })
      .catch((err) => {
         // eslint-disable-next-line no-console
         console.log(err);
         return undefined;
      });

   if (!clerkClaims) {
      return undefined;
   }
   return clerkClaims;
};
app.use(async (c, next) => {
   try {
      const r = await tokenValidation(c);
      const user = await User.findUserById(r?.sub);
      if (!user) {
         return c.json({ ok: false, error: 'User not found' }, 401);
      }
      c.set('ctx', {
         user,
      });
   } catch (error: any) {
      return c.json({ ok: false, error: error.message }, 401);
   }
   await next();
});
app.route('/v1', v1);
export default app;
