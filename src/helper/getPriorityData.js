
export const getPriorityData = (data) => {
  const rolePriority = { owner: 1, administrator: 2 }
  
  return [...data].sort((a, b) => {
    const aSorted = a.account.role;
    const bSorted = b.account.role;
    
    const aPriority = rolePriority[aSorted] || 99
    const bPriority = rolePriority[bSorted] || 99
    return aPriority - bPriority
  })
}