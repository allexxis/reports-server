import flattenObject from './flatObject';
import jpack from 'jsonpack';

export interface Translations {
   [key: string]: string;
}
export interface Result<T> {
   [key: string]: any;
   tableHeader: {
      label: string;
      key: string;
   }[];
   table: T[][];
}
const createReportResponse = <T = any>(
   array: any[] | undefined,
   translations: Translations,
   rest
): Result<T> => {
   if (!array || array.length === 0) {
      return jpack.pack({
         tableHeader: [],
         table: [],
         ...rest,
      });
   }
   for (let i = 0; i < array.length; i++) {
      const row = array[i];
      array[i] = flattenObject(row);
   }

   const tableHeader = Object.keys(array[0]).map((key) => ({
      label: translations[key] || key,
      key,
   }));
   console.log('largo', tableHeader.length);
   console.log('tableHeader', tableHeader);
   const table =
      array.map((row) => {
         return Object.keys(row).map((key) => {
            if (row[key] === null || row[key] === undefined) {
               return '';
            }
            return row[key];
         });
      }) || [];

   return jpack.pack({
      tableHeader,
      table,
      ...rest,
   });
};
export default createReportResponse;
