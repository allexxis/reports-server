import express from 'express';

const router = express.Router();
import explotacion from '@src/lib/seven/procedures/dss/explotacion';

router.get('/explotacion', async (_req, res) => {
   const response = await explotacion({
      from: '2024-01-01 00:00:00.000',
      to: '2024-03-05 00:00:00.00',
      type: 'TOTAL_BY_AGENCY',
      currencyId: 2,
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
});

export default router;
