import { MetaDataPropertyKey } from '../../utils/MetaDataPropertyKey';

export function Validate(validationClass: any) {
  return function (target: any, propertyKey: string, parameterIndex: number) {
    const validationRequired: {
      parameterIndex: number;
      validationClass: any;
    }[] =
      Reflect.getOwnMetadata(
        MetaDataPropertyKey.validate,
        target,
        propertyKey
      ) || [];
    validationRequired.push({
      parameterIndex,
      validationClass,
    });
    Reflect.defineMetadata(
      MetaDataPropertyKey.validate,
      validationRequired,
      target,
      propertyKey
    );
  };
}
