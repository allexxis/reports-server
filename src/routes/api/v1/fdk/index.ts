import agencies from '@src/lib/seven/queries/fdk/agencies';
import currencies from '@src/lib/seven/queries/fdk/currencies';
import markets from '@src/lib/seven/queries/fdk/markets';
import prices from '@src/lib/seven/queries/fdk/prices';
import roomType from '@src/lib/seven/queries/fdk/room/type';
import roomUsage from '@src/lib/seven/queries/fdk/room/usage';
import { Hono } from 'hono';

const app = new Hono();

app.get('/currencies', async (ctx) => {
   const context = ctx.get('ctx');
   const response = await currencies({
      ctx: context,
   });

   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.currencies?.map((currency) => {
               return {
                  label: currency.code,
                  value: currency.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response,
      ok: true,
   });
});
app.get('/markets', async (ctx) => {
   const context = ctx.get('ctx');

   const response = await markets({
      ctx: context,
   });

   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.markets?.map((market) => {
               return {
                  label: market.name,
                  value: market.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response.markets,
      ok: true,
   });
});
app.get('/agencies', async (ctx) => {
   const context = ctx.get('ctx');
   const response = await agencies({
      ctx: context,
   });

   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.agencies?.map((agency) => {
               return {
                  label: agency.name,
                  value: agency.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response.agencies,
      ok: true,
   });
});
app.get('/prices', async (ctx) => {
   const context = ctx.get('ctx');
   const response = await prices({
      ctx: context,
   });

   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.prices?.map((price) => {
               return {
                  label: price.name,
                  value: price.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response.prices,
      ok: true,
   });
});
app.get('/rooms/type', async (ctx) => {
   const context = ctx.get('ctx');
   const response = await roomType({
      ctx: context,
   });
   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.rooms?.map((room) => {
               return {
                  label: room.name,
                  value: room.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response.rooms,
      ok: true,
   });
});
app.get('/rooms/usage', async (ctx) => {
   const context = ctx.get('ctx');
   const response = await roomUsage({
      ctx: context,
   });
   if (response.error) {
      return ctx.json({
         error: response.error,
      });
   }
   const params = ctx.req.query();
   if (params.select === 'true') {
      return ctx.json({
         ok: true,
         data: {
            select: response.rooms?.map((room) => {
               return {
                  label: room.name,
                  value: room.id,
               };
            }),
         },
      });
   }
   return ctx.json({
      data: response.rooms,
      ok: true,
   });
});
export default app;
