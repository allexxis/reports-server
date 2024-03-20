import { executeQuery } from '@lib/seven/index';
import { AppContext, LibError } from '@src/types';
import { set, get } from '@lib/redis';
export interface MarketsOptions {
   ctx: AppContext;
   connectionString?: string;
}
export interface Market {
   id: number;
   name: string;
   deleted: boolean;
}
interface MarketsResult {
   markets?: Market[];
}
const markets = async (
   options: MarketsOptions
): Promise<MarketsResult & LibError> => {
   const rKey = `${options.ctx.user.id}::fdk:market`;
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }

   const query = `USE HG_SevenFront; SELECT * FROM HOTEMERC ORDER BY desc_merc;`;
   const response = await executeQuery(
      options.connectionString || options.ctx.user.dbString,
      query
   ).catch((err) => {
      return {
         error: err,
      };
   });
   if (response['error']) {
      return { error: response['error'].message };
   }
   const markets: Market[] = response['recordset'].map((market) => {
      return {
         id: market.id_merc,
         name: market.desc_merc.trim(),
         deleted: market.eliminado,
      };
   });
   set(rKey, {
      markets,
   });
   return {
      markets,
   };
};
export default markets;
