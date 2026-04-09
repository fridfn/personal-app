import { motion } from "framer-motion";
import { useDominantColor } from "@/hooks/useDominantColor";

const MusicBubble = ({ index, selectedMusic, music, className, onClick, icons, date, defaultIcon }) => {
 const imageUrl = selectedMusic?.music?.music?.image;
  const { background, text } = useDominantColor(imageUrl);
  const { dateNumber, dayName } = date;
  
  return (
    <motion.div
         key={index}
         onClick={() => onClick()}
         style={{ backgroundColor: background }}
         className={className}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{
           duration: 0.4,
           delay: 1 + index * 0.08,
           ease: "easeOut"
         }}
         >
         <div className="items">
           <div className="mood">
             <span style={{ "--color": text }} className="material-symbols-outlined material-icons-light">
               {icons}
             </span>
           </div>
           <p className="date" style={{ "--color": text }}>{dateNumber}</p>
           <p className="day" style={{ "--color": text }}>{dayName}</p>
         </div>
       </motion.div>
  );
};

export default MusicBubble;