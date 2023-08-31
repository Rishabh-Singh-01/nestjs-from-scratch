import { NextFunction, Request, Response } from 'express';
import { Get } from '../Decorators/routes';
import { Controller } from '../Decorators/Controller';

@Controller('products')
class ProductController {
  @Get('')
  getProduct(req: Request, res: Response, next: NextFunction) {
    return res.send('hellow');
  }
}
