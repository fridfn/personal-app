import React from "react"
import metadata from "@/metadata"
import DOMPurify from "dompurify"
import EachUtils from "@/utils/EachUtils"
import UseSwiper from  "@/utils/useSwiper"
import UseListing from "@/utils/useListing"
import Rocket from "@/component/animate/rocket"
import Candles from "@/component/animate/candle"
import FallingText from '@/component/reactbit/fallingText';

const LogoIcons = ({ type }) => {
  const components = {
   rocket: Rocket,
   candles: Candles
  }
  
  const Component = components[type]
  
  return (
   <div className="box-logo">
    {Component && <Component />}
   </div>
  )
}

const Description = ({ data, highlightWords }) => {
  const sanitizedHTML = DOMPurify.sanitize(data)
  
  return (
   <div className='box-description'>
   <FallingText
     text={sanitizedHTML}
     highlightWords={highlightWords}
     highlightClass="highlighted"
     trigger="hover"
     backgroundColor="transparent"
     gravity={0.35}
     wireframes={false}
     mouseConstraintStiffness={0.9}
   />
   </div>
  )
}

const TitleDescription = ({ highlightWords, data, icons, type, count }) => {
  
  const ArrType = {
   carousel: {
    component: UseSwiper,
    datas: data,
   },
   description: {
    component: Description,
    datas: data
   }
  }
  const ResultComponent = ArrType[type]?.component;
  const ResultData = ArrType[type]?.datas;
  
  return (
   <div className='sub-content'>
    <div className='content'>
     {icons && (<LogoIcons type={icons} />)}
     {count ?
      (<UseListing data={count} type="cards"/>) :
      (<ResultComponent data={ResultData} highlightWords={highlightWords} type="cards" />)
     }
    </div>
   </div>
  )
}

export default TitleDescription;