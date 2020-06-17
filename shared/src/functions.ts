export const JSONparse = (input: string | object | null | undefined) =>
  typeof input === "object" || input === null || input === undefined
    ? input
    : JSON.parse(input);
