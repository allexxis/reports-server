import { User } from '@src/lib/user';
import { MiddlewareHandler } from 'hono/types';

export interface LibError {
   error?: string;
}

export interface UIFilter {
   label: string;
   key: string;
   values?: any;
   query?: true;
   type: 'select' | 'date-range' | 'number' | 'text' | 'date' | 'header';
   section?: string;
   required?: boolean;
}
export interface AppContext {
   user: User;
}
export type AuthRequest = MiddlewareHandler<{
   Variables: {
      ctx: AppContext;
   };
}>;
declare module 'hono' {
   interface ContextVariableMap {
      ctx: {
         user: User;
      };
   }
}
