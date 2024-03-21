import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';
import currenciesQuery from '@src/lib/seven/queries/fdk/currencies';
import { AppContext } from '@src/types';

const addRate = async (
   params: IProcedureParams[],
   rate: number,
   ctx: AppContext,
   dbConfig?: any
) => {
   const currencies = await currenciesQuery({ dbConfig, ctx: ctx });
   const currency = currencies.currencies?.find((c) => c.id === rate);
   if (currency) {
      params.push({
         name: 'tasa',
         type: sql.Int,
         value: currency.rate,
      });
   }
};

export default addRate;
