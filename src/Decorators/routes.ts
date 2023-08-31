import 'reflect-metadata';
import { MetaDataPropertyKey } from '../utils/MetaDataPropertyKey';
import { MethodMetaKeys } from '../utils/MethodMetaKeys';

function routeHelper(key: MethodMetaKeys) {
  return function (path?: string) {
    return function (
      target: any, // this is the function on which decorator is applied
      propertyKey: string, // name of the method on which decorator is applied
      propertyDescriptor: PropertyDescriptor
    ) {
      // setting up meta data for a route method like get on some routePath like /something
      Reflect.defineMetadata(
        MetaDataPropertyKey.routeMethod,
        key,
        target,
        propertyKey
      );
      Reflect.defineMetadata(
        MetaDataPropertyKey.routePath,
        path === undefined ? '' : path,
        target,
        propertyKey
      );
    };
  };
}

export const Get = routeHelper(MethodMetaKeys.get);
export const Post = routeHelper(MethodMetaKeys.post);
export const Patch = routeHelper(MethodMetaKeys.patch);
export const Put = routeHelper(MethodMetaKeys.put);
export const Delete = routeHelper(MethodMetaKeys.delete);
