import express from 'express';
import { AppRouter } from './AppRouter';
import './controller/user.controller';
import './controller/product.controller';

const app = express();

app.use(AppRouter.getInstance());

app.listen('3000', () => {
  console.log('app started listening');
});
