import { executeQuery } from '@lib/seven/index';
import { LibError } from '@src/types';

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
   transformable: boolean;
   billable: boolean;
   deleted: boolean;
   refer: boolean;
   date: string;
}
interface CurrencyResult {
   currencies?: Currency[];
}
const currencies = async (
   options: CurrencyOptions
): Promise<CurrencyResult & LibError> => {
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
   const currencies: Currency[] = response['recordset'].map((currency) => {
      return {
         id: currency.id_mone,
         code: currency.cod_mone,
         description: currency.desc_mone.trim(),
         rate: currency.tasa,
         comission: currency.comision,
         decimals: currency.decimales,
         transformable: currency.convertible,
         date: currency.fecha_ult,
         billable: currency.facturable,
         deleted: currency.eliminado,
         refer: currency.refer_mone,
      };
   });
   return {
      currencies: currencies,
   };
};
export default currencies;