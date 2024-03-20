import { get } from '@lib/redis';
export interface User {
   id: number;
   name: string;
   clerkId: string;
   dbString: string;
}

const findUserById = async (
   id?: number | string
): Promise<User | undefined> => {
   if (!id) return undefined;
   let key = 'id';
   if (typeof id === 'string') {
      key = 'clerkId';
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
