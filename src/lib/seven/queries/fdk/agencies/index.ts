import { executeQuery } from '@lib/seven/index';
import { LibError } from '@src/types';

export interface AgencyOptions {
   connectionString: string;
}
export interface Agency {
   id: number;
   name: string;
   direct: boolean;
   deleted: boolean;
   shared: boolean;
}
export interface AgencyResult {
   agencies?: Agency[];
}
const agencies = async (
   options: AgencyOptions
): Promise<AgencyResult & LibError> => {
   const query = `USE HG_SevenFront; SELECT * FROM HOTEAGEN ORDER BY agencia;`;
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
   const agencies: Agency[] = response['recordset'].map((agency) => {
      return {
         id: agency.id_agen,
         name: agency.agencia,
         direct: agency.directo,
         deleted: agency.eliminado,
         shared: agency.comparte_cupos,
      };
   });
   return {
      agencies,
   };
};
export default agencies;
