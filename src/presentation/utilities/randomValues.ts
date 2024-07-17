export const getRandomValueFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
