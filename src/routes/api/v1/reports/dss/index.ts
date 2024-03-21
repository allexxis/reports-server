import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/dss/explotacion';
import { REPORT_TYPE_SELECT } from '@src/lib/seven/procedures/dss/explotacion/types';
import { UIFilter } from '@src/types';
import { log } from '@utils/logger';
import { Hono } from 'hono';
import jpack from 'jsonpack';
import flattenObject from '@src/utils/flatObject';
import createReportResponse from '@src/utils/createReportResponse';

const app = new Hono();
const translations = {
   contract: 'Contrato',
   agency: 'Agencia',
   market: 'Mercado',
   lodging: 'Alojamiento',
   ayb: 'AYB',
   aybPercentage: 'AYB %',
   hospPercentage: 'Hosp %',
   others: 'Otros',
   othersFront: 'Otros Front',
   otherPv: 'Otros PV',
   otherPercentage: 'Otros %',
   nights: 'Noches',
   roomNights: 'Noches Hab',
   nightsPercentage: 'Noches %',
   adults: 'Adultos',
   adultNights: 'Noches Adultos',
   adultsNightsPercentage: 'Noches Adultos %',
   children: 'Niños',
   childrenNights: 'Noches Niños',
   dates: 'Fechas',
   'dates.utc': 'Fechas UTC',
   'dates.start': 'Fechas Inicio',
   'dates.end': 'Fechas Fin',
   'group.by': 'Agrupador',
   'group.value': 'Agrupador Valor',
   'room.type.code': 'Código de habitación',
   'room.type.name': 'Tipo de habitación',
   'room.usage.code': 'Código de habitación',
   'room.usage.name': 'Uso de habitación',
   'contract.code': 'Código de contrato',
   'contract.name': 'Nombre de contrato',
   group: 'Grupo',
   detail: 'Detalle',
   capacity: 'Capacidad',
   capacityFor: 'Capacidad para',
   seats: 'Asientos',
   seatsFor: 'Asientos para',
   promoRate: 'Tarifa Promo',
   hideDetail: 'Ocultar Detalle',
};
const filters: UIFilter[] = [
   {
      label: 'Tipo de reporte',
      key: 'type',
      values: Object.keys(REPORT_TYPE_SELECT).map((key) => ({
         label: REPORT_TYPE_SELECT[key],
         value: key,
      })),
      type: 'select',
      required: true,
   },
   {
      label: 'Fechas',
      type: 'date-range',
      key: 'dates',
      required: true,
   },
   {
      label: 'Moneda',
      type: 'select',
      values: 'fdk.currencies',
      query: true,
      key: 'currencyId',
      required: true,
   },
   {
      label: 'Filtros',
      type: 'header',
      key: 'filters',
      section: 'filters',
   },
   {
      label: 'Agencia',
      type: 'select',
      values: 'fdk.agencies',
      query: true,
      key: 'agency',
      section: 'filters',
   },
   {
      label: 'Mercado',
      type: 'select',
      values: 'fdk.markets',
      query: true,
      key: 'market',
      section: 'filters',
   },
   {
      label: 'Precio / Contrato',
      type: 'select',
      values: 'fdk.prices',
      query: true,
      key: 'price',
      section: 'filters',
   },
   {
      label: 'Tipo de habitación',
      type: 'select',
      values: 'fdk.roomType',
      query: true,
      key: 'roomType',
      section: 'filters',
   },
   {
      label: 'Uso de habitación',
      type: 'select',
      values: 'fdk.roomUsage',
      query: true,
      key: 'roomUsage',
      section: 'filters',
   },
   {
      label: 'Tipo de agencia',
      type: 'select',
      values: [
         { label: 'Agencia', value: 0 },
         { label: 'Directo', value: 1 },
      ],
      key: 'agencyType',
      section: 'filters',
   },
];
app.post('/explotacion', async (c) => {
   const startTime = Date.now();
   const params = c.req.query();
   if (params.filters === 'true') {
      console.log({ ok: true, data: { filters } });
      return c.json({ ok: true, data: { filters } });
   }
   try {
      const body = await c.req.json();
      const context = c.get('ctx');

      const response = await explotacion({
         ...body,
         ctx: context,
         connectionString: config.db.DEV_CONNECTION_STRING,
      });
      if (response.error) {
         return c.json({
            error: response.error,
         });
      }
      const result = createReportResponse(
         response.data?.results,
         translations,
         { hotel: response.data?.hotel }
      );

      return c.json({
         data: result,
         ok: true,
      });
   } catch (error: any) {
      log(error);
      return c.json({
         error: error.message,
      });
   }
});

export default app;
