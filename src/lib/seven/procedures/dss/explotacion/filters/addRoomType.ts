import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addRoomType = (params: IProcedureParams[], roomType?: number) => {
   if (roomType) {
      params.push({
         name: 'Fil_id_thab',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_id_thab',
         type: sql.Int,
         value: roomType,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_id_thab',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_id_thab',
         type: sql.Int,
         value: null,
      }
   );
};

export default addRoomType;
