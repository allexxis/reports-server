import { executeQuery } from '@lib/seven/index';
import { LibError } from '@src/types';
import { set, get } from '@lib/redis';
export interface CurrencyOptions {
   connectionString: string;
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
   const rKey = '1:fdk:cur';
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const query = `USE HG_SevenFront; SELECT * FROM SICLAMON;`;
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
   console.log(response['recordset']);
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
   set(
      rKey,
      JSON.stringify({
         currencies: currencies,
      })
   );
   return {
      currencies: currencies,
   };
};
export default currencies;
