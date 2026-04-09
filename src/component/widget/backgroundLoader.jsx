import Loader from "@/component/ui/loader"
import { motion, AnimatePresence } from "framer-motion"

const BackgroundLoader = ({ loading }) => {
  if (!loading) return;
  
  return (
   <motion.div
      key={loading}
      className="container-loading"
      exit={{ opacity: 0.3, x: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      initial={{ opacity: 0, y: 0 }}
    >
     <Loader />
   </motion.div>
  )
}

export default BackgroundLoader;