import Loader from "@/component/ui/loader"
import MessageCards from "@/component/widget/messageCards"
import { shuffleHelper } from "@/utils/shuffleHelper"
import { usePublicDatabase } from "@/hooks/usePublicDatabase"

const BannerFeedback = ({ data, index }) => {
  const { loading } = usePublicDatabase("feedback")
  
  const direction = index  % 2 === 0 ? "left" : "right";
  if (loading) return <Loader />
  return (
   <div className="wrapper-content" id="wrapper-weeks">
     <MessageCards
       type="feedback"
       direction={direction}
       data={shuffleHelper([...data])}
       index={(Math.floor(Math.random() * 6) + 7) / 10}
     />
    </div>
  )
}


export default BannerFeedback;