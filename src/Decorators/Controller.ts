import { NextFunction, Request, Response } from 'express';
import { AppRouter } from '../AppRouter';
import { MethodMetaKeys } from '../utils/MethodMetaKeys';
import { MetaDataPropertyKey } from '../utils/MetaDataPropertyKey';
import { KeyValuePair } from '../utils/KeyValuePair';
import { plainToClass, plainToInstance } from 'class-transformer';

export function Controller(basePath: string) {
  return function (constructor: Function) {
    const router = AppRouter.getInstance();

    for (const classMethodName in constructor.prototype) {
      const routeMethodMetaData: MethodMetaKeys = Reflect.getMetadata(
        MetaDataPropertyKey.routeMethod,
        constructor.prototype,
        classMethodName
      );

      const routePathMetaData = Reflect.getMetadata(
        MetaDataPropertyKey.routePath,
        constructor.prototype,
        classMethodName
      );

      console.log(routePathMetaData);
      console.log(routeMethodMetaData);
      console.log(basePath);

      // ---------- THIS PART DENOTES INTEGRATION OF PARAM + QUERY DECORATOR -------------- //
      const existingRequiredParameter: KeyValuePair[] = Reflect.getOwnMetadata(
        MetaDataPropertyKey.routeHandlerParameters,
        constructor.prototype,
        classMethodName
      );

      // getting the intended routeHandler from prototypial chain
      const routeHandler: Function = constructor.prototype[classMethodName];

      router[routeMethodMetaData](
        `/${basePath}/${routePathMetaData}`,
        (req: Request, res: Response, next: NextFunction) => {
          // ---------- THIS PART DENOTES INTEGRATION OF PARAM + QUERY DECORATOR -------------- //
          console.log(existingRequiredParameter);
          const routeHandlerParameters: any[] = [];
          existingRequiredParameter.forEach((kv: KeyValuePair) => {
            if (kv.key === MetaDataPropertyKey.requestParam) {
              const param: string = req.params[kv.value];
              routeHandlerParameters.push(param);
            } else if (kv.key === MetaDataPropertyKey.requestQuery) {
              if (kv.value === '') routeHandlerParameters.push(req.query);
              else routeHandlerParameters.push(req.query[kv.value]);
            } else if (kv.key === MetaDataPropertyKey.requestBody) {
              const body: string = req.body[kv.value];
              routeHandlerParameters.push(body);
            } else throw new Error('No sucn route handler parameter is found');
          });
          // -----------------------------------------------------------------------
          // ---------------------- VALIDATE IN RUNTIME FOR DECORATOR @Validate -----------------------
          const validationRequired = Reflect.getOwnMetadata(
            MetaDataPropertyKey.validate,
            constructor.prototype,
            classMethodName
          );
          [...routeHandlerParameters].reverse().forEach((param, i) => {
            validationRequired.forEach(
              (validationParamClassKey: {
                parameterIndex: number;
                validationClass: any;
              }) => {
                if (i === validationParamClassKey.parameterIndex) {
                  const parsedClass = plainToInstance(
                    validationParamClassKey.validationClass,
                    param
                  );
                  console.log(parsedClass);
                  //   for (const property in parsedClass) {
                  //     if (
                  //       parsedClass[property] === undefined ||
                  //       parsedClass[property] === null
                  //     )
                  //       res.status(400).json({
                  //         status: 'Error',
                  //         description: 'Provide valid parameters',
                  //       });
                  //   }
                }
              }
            );
          });

          // ------------------------------------------------------------------------
          // finalizing the request
          /// :TODO - find why the existing Required parameter is in the order it is
          // lets say i have a routeHandler in user.controller.ts getCats(@Params,@Query) so this in theory shoudl produce a existing requried parameter array as [param,query] but its producign [query,params] ?? why
          // so thats why as a workaround i just reversed it
          res
            .status(201)
            .json(routeHandler(...routeHandlerParameters.reverse()));
        }
      );
    }
  };
}
