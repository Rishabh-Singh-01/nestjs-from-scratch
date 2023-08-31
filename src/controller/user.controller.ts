import express, { NextFunction, Request, Response } from 'express';
import { Controller } from '../Decorators/Controller';
import { Get } from '../Decorators/routes';
import { Body } from '../Decorators/Request/Body';
import { Param } from '../Decorators/Request/Params';
import { Query } from '../Decorators/Request/Query';
import { Validate } from '../Decorators/Validation/Validate';
import { Expose } from 'class-transformer';
// import { IsString } from '../Decorators/Validation/IsString';

class QueryInterfaceInRunTime {
  @Expose() name!: string;
  @Expose() healthy!: boolean;
}

@Controller('cats')
class UserController {
  @Get(':id')
  getRootResult(
    @Param('id') id: string,
    @Query()
    @Validate(QueryInterfaceInRunTime)
    query: QueryInterfaceInRunTime
  ) {
    return { id, query };
  }
}
