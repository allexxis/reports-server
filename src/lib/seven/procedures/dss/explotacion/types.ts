export interface ExplotacionOptions {
   from: string;
   to: string;
   type: ReportTypes;
   currencyId: number;
   connectionString: string;
   filters?: {
      agency?: number;
      market?: number;
      price?: number;
      roomType?: number;
      roomUsage?: number;
      agencyType?: 0 | 1; //0 = Agencia, 1 = Directo
   };
}

export interface Segment {
   contract: {
      code: string;
      name: string;
   };
   agency: string;
   market: string;
   room: {
      type: {
         code: string;
         name: string;
      };
      usage: {
         code: string;
         name: string;
      };
   };
   lodging: number;
   ayb: number;
   aybPercentage: number;
   hospPercentage: number;
   others: number;
   othersFront: number;
   otherPv: number;
   otherPercentage: number;
   nights: number;
   roomNights: number;
   nightsPercentage: number;
   adultNightsPercentage: number;
   adults: number;
   children: number;
   adultNights: number;
   childrenNights: number;
   dates: {
      utc: string;
      start: string;
      end: string;
   };
   group: {
      by: string;
      value: string;
   };
   detail: {
      code: string;
      value: string;
   };
   capacity: number;
   capacityFor: number;
   seats: number;
   seatsFor: number;
   currency: string;
   promoRate: number;
   hideDetail: boolean;
}
export interface ExplotacionResult {
   data?: {
      results: any[];
      filters: any[];
      hotel: string;
   };
}
export type ReportTypes =
   | 'TOTAL_BY_AGENCY'
   | 'TOTAL_BY_AGENCY_DETAILED_BY_PRICE'
   | 'TOTAL_BY_AGENCY_DETAILED_BY_ROOM_TYPE'
   | 'TOTAL_BY_AGENCY_DETAILED_BY_ROOM_USAGE'
   | 'TOTAL_BY_MARKET'
   | 'TOTAL_BY_MARKET_DETAILED_BY_AGENCY'
   | 'TOTAL_BY_MARKET_DETAILED_BY_PRICE'
   | 'TOTAL_BY_MARKET_DETAILED_BY_ROOM_TYPE'
   | 'TOTAL_BY_MARKET_DETAILED_BY_ROOM_USAGE'
   | 'TOTAL_BY_PRICE'
   | 'TOTAL_BY_PRICE_DETAILED_BY_ROOM_TYPE'
   | 'TOTAL_BY_PRICE_DETAILED_BY_ROOM_USAGE'
   | 'TOTAL_BY_ROOM_TYPE'
   | 'TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET_DETAILED_BY_AGENCY'
   | 'TOTAL_BY_ROOM_TYPE_DETAILED_BY_PRICE'
   | 'TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET'
   | 'TOTAL_BY_ROOM_TYPE_DETAILED_BY_ROOM_USAGE';
type ReportTypesMap = {
   [key in ReportTypes]: number;
};
export const REPORT_TYPE: ReportTypesMap = {
   TOTAL_BY_AGENCY: 1,
   TOTAL_BY_AGENCY_DETAILED_BY_PRICE: 2,
   TOTAL_BY_AGENCY_DETAILED_BY_ROOM_TYPE: 3,
   TOTAL_BY_AGENCY_DETAILED_BY_ROOM_USAGE: 4,
   TOTAL_BY_MARKET: 5,
   TOTAL_BY_MARKET_DETAILED_BY_AGENCY: 6,
   TOTAL_BY_MARKET_DETAILED_BY_PRICE: 7,
   TOTAL_BY_MARKET_DETAILED_BY_ROOM_TYPE: 8,
   TOTAL_BY_MARKET_DETAILED_BY_ROOM_USAGE: 9,
   TOTAL_BY_PRICE: 10,
   TOTAL_BY_PRICE_DETAILED_BY_ROOM_TYPE: 11,
   TOTAL_BY_PRICE_DETAILED_BY_ROOM_USAGE: 12,
   TOTAL_BY_ROOM_TYPE: 13,
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET_DETAILED_BY_AGENCY: 14,
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_PRICE: 15,
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET: 16,
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_ROOM_USAGE: 17,
};
