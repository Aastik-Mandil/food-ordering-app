export const dbTimeForHuman = (str: String) => {
  return str.replace("T", " ").substring(0, 16);
};
