import { IProcedureParams } from '@lib/seven/index';
import sql from 'mssql';
import { ExplotacionOptions, REPORT_TYPE } from '../types';
const createBaseFilters = (options: ExplotacionOptions): IProcedureParams[] => {
   return [
      {
         name: 'desde',
         type: sql.DateTime,
         value: options.dates.from + ' 00:00:00.000', //'2024-01-01 00:00:00.000',
      },
      {
         name: 'hasta',
         type: sql.DateTime,
         value: options.dates.to + ' 23:59:59.999', //'2024-03-05 00:00:00.000',
      },
      {
         name: 'orden',
         type: sql.Int,
         value: REPORT_TYPE[options.type],
      },
      {
         name: 'id_mone',
         type: sql.Int,
         value: options.currencyId,
      },
      {
         name: 'TipoInforme',
         type: sql.VarChar,
         value: '', // Este no se está utilzando entonces mandar el default
      },
      {
         name: 'full_ingresos',
         type: sql.Bit,
         value: 1, // Esto equivale al valor "ver" en la pantalla de reportes de explotación
      },
   ];
};
export default createBaseFilters;
