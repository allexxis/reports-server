import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';

const addAgencyType = (params: IProcedureParams[], agencyType?: number) => {
   if (agencyType) {
      params.push({
         name: 'Fil_tipo',
         type: sql.Bit,
         value: 1,
      });
      params.push({
         name: 'vFil_tipo',
         type: sql.Int,
         value: agencyType,
      });
      return;
   }
   params.push(
      {
         name: 'Fil_tipo',
         type: sql.Bit,
         value: 0,
      },
      {
         name: 'vFil_tipo',
         type: sql.Int,
         value: null,
      }
   );
};

export default addAgencyType;
