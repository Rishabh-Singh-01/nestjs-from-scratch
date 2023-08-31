export function IsString() {
  return function (target: any, propertyKey: string) {
    console.log('fffffffffffffffffffffffffffffff');
    console.log(target);
    console.log(propertyKey);
  };
}
