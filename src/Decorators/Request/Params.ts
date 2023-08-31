import { KeyValuePair } from '../../utils/KeyValuePair';
import { MetaDataPropertyKey } from '../../utils/MetaDataPropertyKey';

export function Param(param: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const existingRequiredParameter: KeyValuePair[] =
      Reflect.getOwnMetadata(
        MetaDataPropertyKey.routeHandlerParameters,
        target,
        propertyKey
      ) || [];
    console.log('param' + parameterIndex);
    existingRequiredParameter.push({
      key: MetaDataPropertyKey.requestParam,
      value: param,
    });
    Reflect.defineMetadata(
      MetaDataPropertyKey.routeHandlerParameters,
      existingRequiredParameter,
      target,
      propertyKey
    );
    console.log('param arrayu' + existingRequiredParameter);
  };
}
