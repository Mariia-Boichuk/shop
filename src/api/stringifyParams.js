export const stringifyParams = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value], index) => {
    if (value !== null && value !== undefined && value !== "all") {
      return `${acc}${index === 0 ? "/" : "&"}${key}/${value}`;
    }

    return acc;
  }, "");
};
