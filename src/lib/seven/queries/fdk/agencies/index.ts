import { executeQuery } from '@lib/seven/index';
import { get, set } from '@src/lib/redis';
import { AppContext, LibError } from '@src/types';

export interface AgencyOptions {
   ctx: AppContext;
   dbConfig?: string;
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
   const rKey = `${options.ctx.user.id}::fdk:agen`;
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const query = `USE HG_SevenFront; SELECT * FROM HOTEAGEN ORDER BY agencia;`;
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
   const agencies: Agency[] = response['recordset'].map((agency) => {
      return {
         id: agency.id_agen,
         name: agency.agencia,
         direct: agency.directo,
         deleted: agency.eliminado,
         shared: agency.comparte_cupos,
      };
   });
   set(rKey, {
      agencies,
   });
   return {
      agencies,
   };
};
export default agencies;
