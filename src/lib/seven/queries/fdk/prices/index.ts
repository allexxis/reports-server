import { executeQuery } from '@src/lib/seven';
import { AppContext, LibError } from '@src/types';
import { set, get } from '@src/lib/redis';
export interface PriceOptions {
   ctx: AppContext;
   dbConfig?: string;
}
export interface Price {
   id: number;
   name: string;
   agencyId: number;
   currencyId: number; //Esto está relacionado con la tabla de SICLAMON
   marketId: number;
   discountId: number | null;
   tempId: number | null;
   deleted: boolean;
}
export interface PriceResult {
   prices?: Price[];
}

const prices = async (
   options: PriceOptions
): Promise<PriceResult & LibError> => {
   const rKey = `${options.ctx.user.id}::fdk:prices`;
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const query = `USE HG_SevenFront; SELECT * FROM HOTECONT ORDER BY contrato;`;
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
   const prices: Price[] = response['recordset'].map((price) => {
      return {
         id: price.id_cont,
         name: price.desc_cont?.trim() || '',
         agencyId: price.id_agen,
         currencyId: price.id_mone,
         marketId: price.id_merc,
         discountId: price.id_dcto,
         deleted: price.eliminado,
      };
   });
   set(rKey, {
      prices,
   });
   return {
      prices: prices,
   };
};
export default prices;
