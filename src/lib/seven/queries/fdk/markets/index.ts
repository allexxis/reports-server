import { executeQuery } from '@lib/seven/index';
import { LibError } from '@src/types';

export interface MarketsOptions {
   connectionString: string;
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
   const query = `USE HG_SevenFront; SELECT * FROM HOTEMERC ORDER BY desc_merc;`;
   const response = await executeQuery(options.connectionString, query).catch(
      (err) => {
         return {
            error: err,
         };
      }
   );
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
   return {
      markets,
   };
};
export default markets;
