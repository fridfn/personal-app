export const extractObject = (arr) => {
  const result = [];

  arr.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (/^\d{8}-\d{6}$/.test(key) && typeof value === "object") {
        result.push({
          id: key,
          ...value,
        });
      }
    });
  });

  return result;
};