import { createClient } from 'redis';

const client = await createClient()
   .on('error', (err) => console.log('Redis Client Error', err))
   .connect();
export const set = (key: string, value: any) =>
   client.set(key, JSON.stringify(value));
export const get = async (key: string) => {
   const value = await client.get(key);
   if (value) {
      return JSON.parse(value);
   }
   return undefined;
};
export default client;
