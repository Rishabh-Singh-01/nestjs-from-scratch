import { KeyValuePair } from '../../utils/KeyValuePair';
import { MetaDataPropertyKey } from '../../utils/MetaDataPropertyKey';

export function Query(query?: string) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    // --- same in all request decorators
    const existingRequiredParameter: KeyValuePair[] =
      Reflect.getOwnMetadata(
        MetaDataPropertyKey.routeHandlerParameters,
        target,
        propertyKey
      ) || [];
    console.log('query' + parameterIndex);
    existingRequiredParameter.push({
      key: MetaDataPropertyKey.requestQuery,
      value: query || '',
    });
    Reflect.defineMetadata(
      MetaDataPropertyKey.routeHandlerParameters,
      existingRequiredParameter,
      target,
      propertyKey
    );

    console.log(target);
    console.log(propertyKey);
    console.log(target);
    console.log('query arrayu' + existingRequiredParameter);
  };
}
