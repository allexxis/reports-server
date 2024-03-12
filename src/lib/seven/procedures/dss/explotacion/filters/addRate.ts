import { IProcedureParams } from '@src/lib/seven';
import sql from 'mssql';
import currenciesQuery from '@src/lib/seven/queries/fdk/currencies';

const addRate = async (
   params: IProcedureParams[],
   rate: number,
   connectionString
) => {
   const currencies = await currenciesQuery({ connectionString });
   const currency = currencies.currencies?.find((c) => c.id === rate);
   if (currency) {
      params.push({
         name: 'tasa',
         type: sql.Numeric,
         value: currency.id,
      });
   }
};

export default addRate;
