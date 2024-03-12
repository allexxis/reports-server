import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addMarket = (params: IProcedureParams[], market?: number) => {
   if (market) {
      params.push({
         name: 'Fil_id_merc',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_id_merc',
         type: sql.Int,
         value: market,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_id_merc',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_id_merc',
         type: sql.Int,
         value: null,
      }
   );
};
export default addMarket;
