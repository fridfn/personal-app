export const filteredObjectFromArray = ({ array = [], key, targets = [], filter = true }) => {
  const setTarget = Array.isArray(targets) ? targets : [targets];

  return array.filter((item) => {
    const value = item[key];
    
    if (Array.isArray(value)) {
      const matched = value.some((v) => setTarget.includes(v));
      return filter ? matched : !matched;
    } else {
      const matched = setTarget.includes(value);
      return filter ? matched : !matched;
    }
  });
};
