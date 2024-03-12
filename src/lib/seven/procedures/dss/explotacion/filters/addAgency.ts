import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addAgency = (params: IProcedureParams[], agency?: number) => {
   if (agency) {
      params.push({
         name: 'Fil_id_agen',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_id_agen',
         type: sql.Int,
         value: agency,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_id_agen',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_id_agen',
         type: sql.Int,
         value: null,
      }
   );
};
export default addAgency;
