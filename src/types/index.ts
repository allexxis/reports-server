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
