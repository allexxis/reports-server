import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/dss/explotacion';
import { REPORT_TYPE_SELECT } from '@src/lib/seven/procedures/dss/explotacion/types';
import { UIFilter } from '@src/types';
import { log } from '@utils/logger';
import { Hono } from 'hono';

const app = new Hono();
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
app.get('/explotacion', async (req) => {
   const params = req.req.query();
   if (params.filters === 'true') {
      return req.json({ ok: true, data: { filters } });
   }
   try {
      const body = req['body'] as any;
      const response = await explotacion({
         ...(body as any),
         connectionString: config.db.DEV_CONNECTION_STRING,
      });
      if (response.error) {
         return req.json({
            error: response.error,
         });
      }
      return req.json({
         data: response.data?.results[0],
         ok: true,
      });
   } catch (error: any) {
      log(error);
      return req.json({
         error: error.message,
      });
   }
});

export default app;
