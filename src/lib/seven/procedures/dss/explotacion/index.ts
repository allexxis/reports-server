import { IProcedureParams, executeProcedure } from '@lib/seven/index';
import sql from 'mssql';
import config from '@src/config';
import { LibError } from '@src/types';
import { REPORT_TYPE, ExplotacionOptions, ExplotacionResult } from './types';

const explotacion = async (
   options: ExplotacionOptions
): Promise<ExplotacionResult & LibError> => {
   const params: IProcedureParams[] = [
      {
         name: 'desde',
         type: sql.DateTime,
         value: options.from, //'2024-01-01 00:00:00.000',
      },
      {
         name: 'hasta',
         type: sql.DateTime,
         value: options.to, //'2024-03-05 00:00:00.000',
      },

      {
         name: 'orden',
         type: sql.Int,
         value: REPORT_TYPE[options.type],
      },
      {
         name: 'id_mone',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'tasa',
         type: sql.Numeric,
         value: null,
      },
      {
         name: 'TipoInforme',
         type: sql.VarChar,
         value: '',
      },
      {
         name: 'Fil_id_agen',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_id_agen',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'Fil_id_merc',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_id_merc',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'Fil_id_cont',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_id_cont',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'Fil_id_thab',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_id_thab',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'Fil_id_uhab',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_id_uhab',
         type: sql.Int,
         value: 0,
      },
      {
         name: 'Fil_tipo',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'vFil_tipo',
         type: sql.Bit,
         value: null,
      },
      {
         name: 'full_ingresos',
         type: sql.Bit,
         value: null,
      },
   ];
   console.time('executeProcedure');
   const response = await executeProcedure(
      config.db.DEV_CONNECTION_STRING,
      'dbo.DSS_Explotacion',
      params,
      'HG_SevenFront'
   ).catch((err) => {
      return {
         error: err,
      };
   });
   if (response['error']) {
      return { error: response['error'].message };
   }

   const result = {
      results: response['recordsets'][0],
      filters: response['recordsets'][1],
      hotel: response['recordsets'][2][0]['Nombre_Hotel'],
   };
   console.timeEnd('executeProcedure');
   return {
      data: result,
   };
};
export default explotacion;
