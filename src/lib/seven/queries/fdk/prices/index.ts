import { executeQuery } from '@src/lib/seven';
import { LibError } from '@src/types';
//  {
//   id_cont: 36,
//   id_naci: 23,
//   id_mone: 3,
//   id_cuenta: null,
//   id_agen: 18,
//   id_dcto: null,
//   id_merc: 27,
//   id_temp: 82,
//   desc_cont: 'COSTA RICA EXOTICA NATUTAL    ',
//   tasa_fija: 1,
//   frec_sabana: 0,
//   observ: '',
//   max_dias: 0,
//   max_saldo: 0,
//   contrato: 'FIT_CREXOTI                                       ',
//   eliminado: false,
//   dega_oblig: false,
//   id_cardex: 136,
//   TipoContrato: false,
//   observ_int: null,
//   id_mopa: 0
// }
export interface PriceOptions {
   connectionString: string;
}
export interface Price {
   id: number;
   name: string;
   agencyId: string;
   currencyId: string;
   marketId: string;
   deleted: boolean;
}
export interface PriceResult {
   prices?: Price[];
}

const prices = async (
   options: PriceOptions
): Promise<PriceResult & LibError> => {
   const query = `USE HG_SevenFront; SELECT * FROM HOTECONT ORDER BY contrato;`;
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
   const prices: Price[] = response['recordset'].map((price) => {
      return {
         id: price.id_cont,
         name: price.desc_cont?.trim() || '',
         agencyId: price.id_agen,
         currencyId: price.id_mone,
         marketId: price.id_merc,
         deleted: price.eliminado,
      };
   });
   return {
      prices: prices,
   };
};
export default prices;
