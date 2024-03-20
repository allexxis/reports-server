import { get, set } from '@lib/redis';
export interface User {
   id: number;
   name: string;
   clerk_id: string;
}

const findUserById = async (
   id?: number | string
): Promise<User | undefined> => {
   if (!id) return undefined;
   let key = 'id';
   if (typeof id === 'string') {
      key = 'clerk_id';
   }
   const clients = (await get('global:clients')) as User[];
   if (!clients) {
      return undefined;
   }
   const client = clients.find((c) => c[key] === id);

   return client;
};
export default {
   findUserById,
};
