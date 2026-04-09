import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TransitionComponent = ({ children, data }) => {
  return (
   <AnimatePresence>
      <motion.section
        key={data}
        animate={{ opacity: 1, y: -65 }}
        transition={{ duration: 0.2 }}
        initial={{
          opacity: .1,
          zIndex: 20,
          y: 20,
          x: 15
        }}
        exit={{ opacity: 0.3, x: 0 }}
      >
      {children}
     </motion.section>
   </AnimatePresence>
  )
}

export default TransitionComponent;