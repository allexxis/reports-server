import { executeQuery } from '@src/lib/seven';
import { LibError } from '@src/types';

export interface RoomTypeOptions {
   connectionString: string;
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
   const query = `USE HG_SevenFront; SELECT * FROM HOTETHAB ORDER BY tipo_hab;`;
   const response = await executeQuery(options.connectionString, query).catch(
      (err) => {
         return {
            error: err,
         };
      }
   );
   if (response['error']) {
      return { error: response['error'].message };
   }
   console.log(response['recordset']);
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
   return {
      rooms: rooms,
   };
};
export default rooms;
