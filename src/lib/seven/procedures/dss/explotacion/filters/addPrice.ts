import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addPrice = (params: IProcedureParams[], price?: number) => {
   if (price) {
      params.push({
         name: 'Fil_id_cont',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_id_cont',
         type: sql.Int,
         value: price,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_id_cont',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_id_cont',
         type: sql.Int,
         value: null,
      }
   );
};
export default addPrice;
