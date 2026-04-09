import { animate } from "motion"
import { useObserveElement } from "@/utils/observeElement"
import { useRef, useState, useEffect } from "react"

export const useAnimateCount = (value, duration) => {
  const ref = useRef()
  const [ count, setCount ] = useState(0)
  
  function handleAnimate() {
    const controls = animate(0, value, {
      duration: duration,
      easing: "easeOutCubic",
      onUpdate: (latest) => setCount(latest),
    });
    return () => controls.stop();
  }
  
  useObserveElement({
    ref,
    callbackFunction: handleAnimate
  })
  
  return {
   ref,
   count
  }
}