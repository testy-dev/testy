export const JSONparse = (input: string | object | null) =>
  typeof input === "object" || input === null ? input : JSON.parse(input);
