// We want class as .class and id as #id, not [class='class']
export const fixClassIdArguments = (attributeName: string) =>
  !["class", "id"].includes(attributeName);
