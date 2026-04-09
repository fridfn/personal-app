import React, { useEffect, useState, useRef } from 'react';

export const useObserveElement = ({ 
   ref,
   loop,
   classes,
   callbackFunction,
   threshold = 0.6
  }) => {
  const [ hasAnimated, setHasAnimated ] = useState(false)
  
  useEffect(() => {
   const element = ref.current;
   const observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !hasAnimated) {
     setHasAnimated(true)
     if (callbackFunction) callbackFunction()
     
     if (classes) element.classList.add(classes)
    }
   }, { threshold })
   
   if (ref.current) observer.observe(ref.current)
   
   return () => {
    if (ref.current) observer.unobserve(ref.current)
   }
  }, [ref])
  
  return {
    hasAnimated 
  }
}