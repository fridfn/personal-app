import React, { useState, useEffect } from 'react';
import metadata from "@/metadata";
import styled from 'styled-components';
import Marquee from "react-fast-marquee";
import EachUtils from "@/utils/EachUtils";
import BroadcastMessage from "@/component/ui/bubble/broadcastMessage"
import FeedbackMessage from "@/component/ui/bubble/feedbackMessage"
import { useThemeHelper } from "@/context/themeContext"

const MessageCards = ({ type, data, direction, index }) => {
  const { theme } = useThemeHelper();
  const [ colorShadow, setColorShadow ] = useState(null)
  
  useEffect(() => {
   const updateColor = () => {
     const root = document.documentElement
     const getColor = getComputedStyle(root).getPropertyValue("--primary-background").trim()
     
     setColorShadow(getColor);
   }
   
   const timeout = setTimeout(updateColor, 0)
   
   return () => clearTimeout(timeout)
  }, [theme, data]);
  
  const componentMessage = {
   feedback: FeedbackMessage,
   broadcast: BroadcastMessage
  }
  const RenderedCompnent = componentMessage[type]
  
  return (
   <StyledWrapper>
     <Marquee speed={index * 25} delay={index * 0.1} direction={direction || "right"} gradient={true} gradientColor={colorShadow} gradientWidth={"5%"} play={true} pauseOnHover={true}>
       <EachUtils
         of={data}
         render={(value, index) => (
           <RenderedCompnent key={index} data={value} />
       )}/>
     </Marquee>
   </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .rfm-marquee-container, .rfm-marquee-container .rfm-marquee {
   overflow: hidden;
  }
  
  .rfm-marquee-container .rfm-marquee {
   display: flex;
   flex-direction: row;
  }
  
  .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child, .rfm-marquee-container .rfm-marquee .rfm-child {
   display: flex;
   position: relative;
   flex-direction: row;
   width: max-content;
  }
  
  .rfm-marquee-container .rfm-marquee #broadcast-message {
   width: 240px!important;
   gap: 10px;
   margin: 0 15px;
  }
  
  .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child .carousel-box .bubble, .rfm-marquee-container .rfm-marquee .rfm-child .carousel-box .bubble {
   padding: 15px 25px;
  }
  
  .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child .carousel-box .bubble .box-description, .rfm-marquee-container .rfm-marquee .rfm-child .carousel-box .bubble .box-description {
   width: 100%;
   padding: 8px 0px;
   border-radius: 8px;
  }
  
  .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child .carousel-box .bubble .box-description, .rfm-marquee-container .rfm-marquee .rfm-child .carousel-box .bubble .box-description .description {
   width: 100%;
  }
  
  .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child .carousel-box .bubble .wrapper .box-image .box, .rfm-marquee-container .rfm-marquee .rfm-child .carousel-box .bubble  .wrapper .box-image .box {
   background-color: #1d1424;
  }
  
  .carousel-box .bubble .wrapper .box-info .wrapper-tags .rfm-marquee-container .rfm-marquee .rfm-child .tags, .carousel-box .bubble .wrapper .box-info .wrapper-tags .rfm-marquee-container .rfm-marquee .rfm-initial-child-container .rfm-child .tags {
   margin-left: 5px!important;
   color: #ccdfeb!important;
  }
`;

export default MessageCards;
