import { AppContext } from '@src/types';

export interface ExplotacionOptions {
   ctx: AppContext;
   dates: { from: string; to: string };
   type: ReportType;
   currencyId: number;
   connectionString?: string;
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
export const ReportTypes = [
   'TOTAL_BY_AGENCY',
   'TOTAL_BY_AGENCY_DETAILED_BY_PRICE',
   'TOTAL_BY_AGENCY_DETAILED_BY_ROOM_TYPE',
   'TOTAL_BY_AGENCY_DETAILED_BY_ROOM_USAGE',
   'TOTAL_BY_MARKET',
   'TOTAL_BY_MARKET_DETAILED_BY_AGENCY',
   'TOTAL_BY_MARKET_DETAILED_BY_PRICE',
   'TOTAL_BY_MARKET_DETAILED_BY_ROOM_TYPE',
   'TOTAL_BY_MARKET_DETAILED_BY_ROOM_USAGE',
   'TOTAL_BY_PRICE',
   'TOTAL_BY_PRICE_DETAILED_BY_ROOM_TYPE',
   'TOTAL_BY_PRICE_DETAILED_BY_ROOM_USAGE',
   'TOTAL_BY_ROOM_TYPE',
   'TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET_DETAILED_BY_AGENCY',
   'TOTAL_BY_ROOM_TYPE_DETAILED_BY_PRICE',
   'TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET',
   'TOTAL_BY_ROOM_TYPE_DETAILED_BY_ROOM_USAGE',
] as const;
export type ReportType = (typeof ReportTypes)[number];

type ReportTypesMap = {
   [key in ReportType as string]: number;
};
type ReportTypesSelect = {
   [key in ReportType as string]: string;
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

export const REPORT_TYPE_SELECT: ReportTypesSelect = {
   TOTAL_BY_AGENCY: 'Total por agencia',
   TOTAL_BY_AGENCY_DETAILED_BY_PRICE: 'Total por agencia por precio',
   TOTAL_BY_AGENCY_DETAILED_BY_ROOM_TYPE:
      'Total por agencia por tipo de habitación',
   TOTAL_BY_AGENCY_DETAILED_BY_ROOM_USAGE:
      'Total por agencia por uso de habitación',
   TOTAL_BY_MARKET: 'Total por mercado',
   TOTAL_BY_MARKET_DETAILED_BY_AGENCY: 'Total por mercado por agencia',
   TOTAL_BY_MARKET_DETAILED_BY_PRICE: 'Total por mercado por precio',
   TOTAL_BY_MARKET_DETAILED_BY_ROOM_TYPE:
      'Total por mercado por tipo de habitación',
   TOTAL_BY_MARKET_DETAILED_BY_ROOM_USAGE:
      'Total por mercado por uso de habitación',
   TOTAL_BY_PRICE: 'Total por precio',
   TOTAL_BY_PRICE_DETAILED_BY_ROOM_TYPE:
      'Total por precio por tipo de habitación',
   TOTAL_BY_PRICE_DETAILED_BY_ROOM_USAGE:
      'Total por precio por uso de habitación',
   TOTAL_BY_ROOM_TYPE: 'Total por tipo de habitación',
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET_DETAILED_BY_AGENCY:
      'Total por tipo de habitación por mercado por agencia',
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_PRICE:
      'Total por tipo de habitación por precio',
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_MARKET:
      'Total por tipo de habitación por mercado',
   TOTAL_BY_ROOM_TYPE_DETAILED_BY_ROOM_USAGE:
      'Total por tipo de habitación por uso de habitación',
};
