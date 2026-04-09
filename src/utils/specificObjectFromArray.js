export const specificObjectFromArray = (data) => {
  const { array, key, targets, filter } = data;
  const setTarget = Array?.isArray(targets) ? targets : [targets];
  console.log({data})
  return array?.filter((items) => {
    const value = items[key]
    
    if (Array?.isArray(value) && filter) {
      return value.some(v => setTarget.includes(v))
    }
    
  console.log("kontoll", setTarget.includes(value))
    return setTarget.includes(value)
  })
}