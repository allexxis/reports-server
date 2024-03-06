import express from 'express';
import config from '@config/index';
import routes from './routes';

const app = express();
app.use(routes);
app.listen(config.PORT, () => {
   console.log(`🦊 Express is running at localhost:${config.PORT}`);
});
