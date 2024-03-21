function flattenObject(obj, parentKey = '') {
   let result = {};

   for (let key in obj) {
      let newKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
         let flattened = flattenObject(obj[key], newKey);
         result = { ...result, ...flattened };
      } else {
         result[newKey] = obj[key];
      }
   }

   return result;
}
export default flattenObject;
