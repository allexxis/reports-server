import { executeQuery } from '@src/lib/seven';
import { LibError } from '@src/types';
// {
//    id_thab: 122,
//    id_con0: 53, //que es esto
//    tipo_hab: '10_STDCASN                                        ',
//    desc_t_hab: 'STANDARD CASONA',
//    max_adultos: 3,
//    max_ninos: 0,
//    eliminado: false,
//    orden_visual: 10,
//    pax_incluido: 2 // Qué es esto?
//  }
export interface RoomTypeOptions {
   connectionString: string;
}
export interface RoomType {
   id: number;
   count: number;
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
