export const findObjectDifference = <T extends Record<string, any>>(obj1: T, obj2: T): Partial<T> => {
    const diff: Partial<T> = {};
  
    Object.keys(obj1).forEach(key => {
      if (obj1[key as keyof T] !== obj2[key as keyof T] && typeof obj1[key] !== 'object') {
        diff[key as keyof T] = obj2[key as keyof T];
      }
    });
  
    return diff;
  }