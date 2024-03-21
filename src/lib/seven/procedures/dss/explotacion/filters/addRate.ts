import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';
import currenciesQuery from '@src/lib/seven/queries/fdk/currencies';
import { AppContext } from '@src/types';

const addRate = async (
   params: IProcedureParams[],
   rate: number,
   ctx: AppContext,
   connectionString?: string
) => {
   const currencies = await currenciesQuery({ connectionString, ctx: ctx });
   const currency = currencies.currencies?.find((c) => c.id === rate);
   console.log('currency', currency);
   if (currency) {
      params.push({
         name: 'tasa',
         type: sql.Int,
         value: currency.rate,
      });
   }
};

export default addRate;
