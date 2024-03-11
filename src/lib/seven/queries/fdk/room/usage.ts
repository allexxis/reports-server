import { executeQuery } from '@src/lib/seven';
import { LibError } from '@src/types';
// {
//   id_uhab: 128,
//   id_thab: 113,
//   uso_hab: 'SUI_DBL  ', Qué es esto?
//   desc_uso_hab: '05_SUITE 2 ADULTO',
//   max_adultos: 2,
//   max_ninos: 0,
//   eliminado: false
// },
export interface RoomUsageOptions {
   connectionString: string;
}
export interface RoomUsage {
   id: number;
   idRoomType: number;
   usage: string;
   name: string;
   maxAdults: number;
   maxChildren: number;
   deleted: boolean;
}
export interface RoomUsageResult {
   rooms?: RoomUsage[];
}

const rooms = async (
   options: RoomUsageOptions
): Promise<RoomUsageResult & LibError> => {
   const query = `USE HG_SevenFront; SELECT uh.* FROM HOTEUHAB uh INNER JOIN HOTETHAB th ON uh.id_thab = th.id_thab WHERE uh.eliminado = 0 AND th.eliminado = 0 ORDER BY uh.uso_hab;`;
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
   const rooms: RoomUsage[] = response['recordset'].map((room) => {
      return {
         id: room.id_uhab,
         idRoomType: room.id_thab,
         name: room.desc_uso_hab?.trim() || '',
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
