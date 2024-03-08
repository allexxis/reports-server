import fs from 'fs';
const writeJson = (path: string, data: any, compress?: boolean) => {
   if (compress) {
      fs.writeFileSync(path, JSON.stringify(data));
      return;
   }
   fs.writeFileSync(path, JSON.stringify(data, null, 2));
};
export default writeJson;
