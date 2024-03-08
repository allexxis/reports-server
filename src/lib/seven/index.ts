import sql from 'mssql';

async function executeQuery(connectionString, query) {
   try {
      // Create a new pool with the provided connection string
      const pool = await sql.connect(connectionString);

      // Execute the query
      const result = await pool.request().query(query);

      // Close the connection pool
      await pool.close();

      // Return the query result
      return result.recordset;
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
   connectionString: string,
   procedure: string,
   params?: IProcedureParams[],
   database?: string
) {
   try {
      // Create a new pool with the provided connection string
      const pool = await sql.connect(connectionString);
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
      pool.addListener('error', (err) => {
         console.error(err);
      });
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
