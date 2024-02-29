// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiCommonAdapter = <T extends Record<string, any>>(object: T) => {
  // Remove all null fields from the object
  const returnObj = {} as T;
  for (const [key, value] of Object.entries(object)) {
    if (!!value) {
      returnObj[key as keyof T] = value;
    }
  }

  return returnObj;
};
