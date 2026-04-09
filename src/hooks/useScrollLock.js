import { useEffect } from "react"

export const useScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) return;
    
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
    
    return () => {
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.overflow = "scroll";
    }
  }, [isLocked])
}