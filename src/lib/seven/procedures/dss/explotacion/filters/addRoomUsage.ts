import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addRoomUsage = (params: IProcedureParams[], roomUsage?: number) => {
   if (roomUsage) {
      params.push({
         name: 'Fil_id_uhab',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_id_uhab',
         type: sql.Int,
         value: roomUsage,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_id_uhab',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_id_uhab',
         type: sql.Int,
         value: null,
      }
   );
};
export default addRoomUsage;
