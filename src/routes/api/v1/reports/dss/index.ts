import config from '@src/config';
import explotacion from '@src/lib/seven/procedures/dss/explotacion';
import express from 'express';
import { log } from '@utils/logger';
const router = express.Router();

router.get('/explotacion', async (req, res) => {
   try {
      const body = req.body;
      const response = await explotacion({
         ...body,
         connectionString: config.db.DEV_CONNECTION_STRING,
      });
      if (response.error) {
         return res.json({
            error: response.error,
         });
      }
      res.json({
         data: response.data?.results[0],
         success: true,
      });
   } catch (error: any) {
      log(error);
      res.json({
         error: error.message,
      });
   }
});

export default router;
