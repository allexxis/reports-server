import packageJson from '@src/../package.json';
import { executeProcedure } from '@lib/seven';
import express from 'express';
import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/explotacion';

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
router.get('/explotacion', async (_req, res) => {
   const response = await explotacion({
      from: '2024-01-01 00:00:00.000',
      to: '2024-03-05 00:00:00.00',
   });
   if (response.error) {
      return res.json({
         error: response.error,
      });
   }
   res.json({
      success: true,
   });
});

export default router;
