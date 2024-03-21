import sql from 'mssql';

async function executeQuery(dbConfig: any, query) {
   try {
      // Create a new pool with the provided connection string
      const pool = await sql.connect({
         ...dbConfig,
         connectionTimeout: 60000, // 60 seconds
         requestTimeout: 60000,
         pool: {
            idleTimeoutMillis: 60000,
            acquireTimeoutMillis: 60000,
         },
      });

      // Execute the query
      const result = await pool.request().query(query);

      // Close the connection pool
      await pool.close();

      // Return the query result
      return result;
   } catch (err: any) {
      throw new Error(`Error executing query: ${err.message}`);
   }
}
export interface IProcedureParams {
   name: string;
   type: sql.ISqlTypeFactoryWithNoParams;
   value: any;
}
async function executeProcedure(
   dbConfig: any,
   procedure: string,
   params?: IProcedureParams[],
   database?: string
) {
   try {
      // Create a new pool with the provided connection string
      const pool = await sql.connect({
         ...dbConfig,
         connectionTimeout: 60000, // 60 seconds
         requestTimeout: 60000,
         pool: {
            idleTimeoutMillis: 60000,
            acquireTimeoutMillis: 60000,
         },
      });
      const request = pool.request();

      if (database) {
         await pool.query(`use ${database}; `);
      }

      if (params) {
         for (let i = 0; i < params.length; i++) {
            const param = params[i];
            request.input(param.name, param.type, param.value);
         }
      }

      // Execute the query
      const result = await request.execute(procedure);

      // Close the connection pool
      await pool.close();

      // Return the query result
      return result;
   } catch (err: any) {
      throw err;
   }
}
export { executeQuery, executeProcedure };
