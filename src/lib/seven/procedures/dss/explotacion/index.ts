import { IProcedureParams, executeProcedure } from '@lib/seven/index';
import sql from 'mssql';
import { set, get } from '@lib/redis';
import { LibError } from '@src/types';
import {
   REPORT_TYPE,
   ExplotacionOptions,
   ExplotacionResult,
   Segment,
} from './types';
import addAgency from './filters/addAgency';
import addMarket from './filters/addMarket';
import addPrice from './filters/addPrice';
import addRoomType from './filters/addRoomType';
import addRoomUsage from './filters/addRoomUsage';
import addAgencyType from './filters/addAgencyType';
import addRate from './filters/addRate';

const explotacion = async (
   options: ExplotacionOptions
): Promise<ExplotacionResult & LibError> => {
   const params: IProcedureParams[] = [
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
         name: 'tasa',
         type: sql.Numeric,
         value: null, // Este campo se tiene que agregar automáticamente  utilizando el query currencies para obtener la tasa de cambio de la moneda seleccionada
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
   addAgency(params, options.filters?.agency);
   addMarket(params, options.filters?.market);
   addPrice(params, options.filters?.price);
   addRoomType(params, options.filters?.roomType);
   addRoomUsage(params, options.filters?.roomUsage);
   addAgencyType(params, options.filters?.agencyType);
   addRate(params, options.currencyId, options.connectionString);
   const rKey =
      '1::' +
      params.reduce((acc, curr) => {
         return acc + curr.name + ':' + curr.value;
      }, '');

   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const response = await executeProcedure(
      options.connectionString,
      'dbo.DSS_Explotacion',
      params,
      'HG_SevenFront'
   ).catch((err) => {
      return {
         error: err,
      };
   });
   if (response['error']) {
      console.log(response['error']);
      return { error: response['error'].message };
   }
   const results: Segment[] = response['recordsets'][0].map((r) => {
      return {
         contract: {
            code: r.contrato.trim(),
            name: r.desc_cont.trim(),
         },
         agency: r.agencia,
         market: r.desc_merc,
         room: {
            type: {
               code: r.tipo_hab.trim(),
               name: r.desc_t_hab.trim(),
            },
            usage: {
               code: r.uso_hab.trim(),
               name: r.desc_uso_hab.trim(),
            },
         },
         lodging: r.hospedaje,
         ayb: r.ayb,
         aybPercentage: r.ayb_porc,
         hospPercentage: r.hosp_porc,
         others: r.otros,
         othersFront: r.otros_front,
         otherPv: r.otros_pv,
         otherPercentage: r.otros_porc,
         nights: r.noches,
         roomNights: r.hab_noches,
         nightsPercentage: r.noches_porc,
         adults: r.adultos,
         adultNights: r.ad_noche,
         adultsNightsPercentage: r.ad_noches_porc,
         children: r.ninos,
         childrenNights: r.ni_noche,
         dates: {
            utc: r.fecha,
            start: r.FecIni,
            end: r.FecFin,
         },
         group: {
            by: r.Agrupador,
            value: r.AgrupadorVal,
         },
         detail: {
            code: r.DEtalle,
            value: r.DetalleVal.trim(),
         },
         capacity: r.capacidad,
         capacityFor: r.capacidad_for,
         seats: r.plazas,
         seatsFor: r.plazas_for,
         currency: r.moneda,
         promoRate: r.TarifaProm,
         hideDetail: r.ocultar_detalle === 1,
      };
   });
   const result = {
      results,
      filters: response['recordsets'][1],
      hotel: response['recordsets'][2][0]['Nombre_Hotel'],
   };
   set(rKey, {
      data: result,
   });
   return {
      data: result,
   };
};
export default explotacion;
