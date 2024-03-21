import { executeQuery } from '@lib/seven/index';
import { AppContext, LibError } from '@src/types';
import { set, get } from '@lib/redis';
export interface CurrencyOptions {
   dbConfig?: any;
   ctx: AppContext;
}
export interface Currency {
   id: number;
   code: string;
   description: string;
   rate: number;
   comission: number;
   decimals: number;
   billable: boolean;
   deleted: boolean;
   refer: boolean;
}
interface CurrencyResult {
   currencies?: Currency[];
}
const currencies = async (
   options: CurrencyOptions
): Promise<CurrencyResult & LibError> => {
   const rKey = `${options.ctx.user.id}::fdk:cur`;
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const query = `USE HG_SevenFront; SELECT * FROM SICLAMON;`;
   const response = await executeQuery(
      options.dbConfig || options.ctx.user.dbConfig,
      query
   ).catch((err) => {
      return {
         error: err,
      };
   });
   if (response['error']) {
      return { error: response['error'].message };
   }
   const currencies: Currency[] = response['recordset'].map((currency) => {
      return {
         id: currency.id_mone,
         code: currency.cod_mone,
         description: currency.desc_mone.trim(),
         rate: currency.tasa,
         comission: currency.comision,
         decimals: currency.decimales,
         billable: currency.facturable,
         deleted: currency.eliminado,
         refer: currency.refer_mone,
      };
   });
   set(rKey, {
      currencies: currencies,
   });
   return {
      currencies: currencies,
   };
};
export default currencies;
