import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HexColorPicker } from "react-colorful";
import { useLoadingContext } from "@/context/loadingContext"

const ChangeTheme = () => {
  const { open } = useLoadingContext()
  const [ color, setColor ] = useState(() => localStorage.getItem("base-color") || "#85a63e");
  
  function handleChangeColor(color) {
   const root = document.documentElement
   const newBaseColor = getComputedStyle(root)
   document.documentElement.setAttribute("style", `--base-color: ${color}`)
  }
  
  if (!open) return;
  return (
   <motion.div
      key={open}
      className="container-theme"
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      initial={{ opacity: 0, y: 50 }}
      exit={{ opacity: 0.3, x: -105 + "%" }}
    >
    <AnimatePresence>
      <HexColorPicker color={color} onChange={handleChangeColor} />;
    </AnimatePresence>
   </motion.div>
  )
}

export default ChangeTheme