import packageJson from '@src/../package.json';
import { executeProcedure } from '@lib/seven';
import express from 'express';
import config from '@src/config';

const router = express.Router();

router.get('/health', (_req, res) => {
   res.json({
      name: packageJson.name,
      version: packageJson.version,
   });
});
router.get('/test', async (_req, res) => {
   console.time('executeProcedure');
   const response = await executeProcedure(
      config.DEV_CONNECTION_STRING,
      'dbo.GetSimpleTable',
      undefined,
      'HG_SevenFront'
   ).catch((err) => {
      res.json({
         error: err.message,
      });
   });
   console.timeEnd('executeProcedure');

   res.json({
      response,
   });
});
export default router;
