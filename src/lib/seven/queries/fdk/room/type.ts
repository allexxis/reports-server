import { executeQuery } from '@src/lib/seven';
import { AppContext, LibError } from '@src/types';
import { set, get } from '@src/lib/redis';
export interface RoomTypeOptions {
   ctx: AppContext;
   dbConfig?: string;
}
export interface RoomType {
   id: number;
   name: string;
   type: string;
   maxAdults: number;
   maxChildren: number;
   deleted: boolean;
}
export interface RoomTypeResult {
   rooms?: RoomType[];
}

const rooms = async (
   options: RoomTypeOptions
): Promise<RoomTypeResult & LibError> => {
   const rKey = `${options.ctx.user.id}::fdk:roomtype`;
   const cached = await get(rKey);
   if (cached) {
      return cached;
   }
   const query = `USE HG_SevenFront; SELECT * FROM HOTETHAB ORDER BY tipo_hab;`;
   const response = await executeQuery(
      options.dbConfig || options.ctx.user.dbConfig,
      query
   ).catch((err) => {
      return {
         error: err,
      };
   });
   if (response['error']) {
      return { error: response['error'].message };
   }
   const rooms: RoomType[] = response['recordset'].map((room) => {
      return {
         id: room.id_thab,
         count: room.id_con0,
         name: room.desc_t_hab?.trim() || '',
         type: room.tipo_hab?.trim() || '',
         maxAdults: room.max_adultos,
         maxChildren: room.max_ninos,
         deleted: room.eliminado,
      };
   });
   set(rKey, {
      rooms,
   });
   return {
      rooms: rooms,
   };
};
export default rooms;
