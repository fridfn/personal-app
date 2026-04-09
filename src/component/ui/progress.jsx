import React, { useRef, useEffect, useState } from "react"
import metadata from '@/metadata'
import styled from 'styled-components';
import EachUtils from "@/utils/EachUtils"
import { useObserveElement } from "@/utils/observeElement"
import { useAnimateCount } from "@/hooks/useAnimateCount"
import IonIcon from "@/component/ui/common/ionicon"

const Progress = ({ data, index }) => {
  const ref = useRef()
  const { experience, image, percent, tech } = data;
  
  const { hasAnimated } = useObserveElement({
    ref,
    threshold: 0.5,
    classes: "progress"
  })
  
  return (
   <div 
    className="progress-container" >
    <div className="progress-box">
     <div className="box-icon">
      <img className="icon" src={image} />
     </div>
     <div className="wrapper-bar">
     <div className="box">
      <p className="title">{tech}</p>
      <p className="percentage">{percent}%</p>
     </div>
     <div className="progress-bar">
      <span
        ref={ref}
        className="bar"
        style={{ width: `${percent}%` }}>
      </span>
     </div>
      <p className="description">
       <IonIcon className="icon" style={{ color: 'var(--description-text)'}} name="time" />
       {experience}
      </p>
     </div>
    </div>
   </div>
  )
}

export const ProgressMBTI  = ({ stats }) => {
  return (
  <StyledWrapper style={{ width: "100%", position: 'relative'}}>
    <div className="container">
     <EachUtils
       of={stats}
       render={(datas, index) => {
        const { title, type, untype, value, color } = datas;
        const { ref, count } = useAnimateCount(value, 3)
        
        return (
         <div className="mbti-box" key={index}>
           <div 
             style={{ justifyContent: 'space-between' }}
             className="wrapper mbti-title">
             <div className="wrapper mbti-title">
               <span className="title sub-title">{type}:</span>
               <span
                style={{ color: color, fontWeight: 'bold' }}
                className="title sub-title">
                   {value}%
                </span>
               <span className="title">{title}</span>
             </div>
             <IonIcon name="help-circle" className="icon" />
           </div>
           <div className="mbti-bar" ref={ref}>
             <span 
               className="mbti-per"
               style={{ width: `calc(${count}% + 20%)`, backgroundColor: color }}>
               <span className="tooltip">
                 {count.toFixed(0)}%
               </span>
               <div className="circle" style={{ marginLeft: "96%" }}></div>
             </span>
           </div>
           <div className="wrapper type">
              <span className="type">{title}</span>
              <span className="type">{untype}</span>
           </div>
         </div>
        )}}/>
    </div>
  </StyledWrapper>
 );
}


const StyledWrapper = styled.div`
   
  .container {
    width: auto;
    padding: 0;,
    position: relative;
  }

  .container .mbti-box {
    width: 100%;
    margin: 20px 0;
    position: relative,
  }
  
  .mbti-box .wrapper {
   align-items: end;
   margin-top: 5px;
  }
  
  .mbti-box .mbti-title {
   flex-direction: row;
   align-items: center;
   justify-content: flex-start;
  }
  
  .mbti-box .mbti-title .icon {
   color: var(--description-text);
   font-size: var(--primary-size-icon);
  }
  
  .mbti-box .wrapper .type {
   font-weight: 500;
   font-size: var(--description-font-size);
   color: var(--description-text)!important;
  }
  
  .mbti-box .type {
   flex-direction: row!important;
   justify-content: space-between!important;
  }
  
  .mbti-box .title {
    display: block;
    font-weight: 600;
    font-family: "Helvetica";
    font-size: var(--secondary-font-size);
  }
  
  .mbti-box .sub-title {
   font-weight: 500;
  }
  
  .mbti-box .mbti-bar {
    height: 8px;
    width: 100%;
    margin-top: 6px;
    border-radius: 6px;
    background: rgba(236, 236, 236, 0.1);
  }
  
  .mbti-bar .mbti-per {
    position: relative;
    display: block;
    height: 100%;
    width: 90%;
    border-radius: 6px;
  }
  
  .mbti-bar .mbti-per .circle {
   width: 10px;
   height: 10px;
   bottom: -.1rem;
   position: absolute;
   border-radius: 50%;
   border: 3px solid var(--bubble-color);
   background-color: var(--primary-color-text);
  }
  
  .mbti-bar .mbti-per {
    animation: progress 5s ease-in-out;
    animation-timeline: scroll();
    animation-fill-mode: both;
  }
  
  @keyframes progress {
    0% {
      width: 0%;
      opacity: 1;
    }
    70%,80%,90%,100% {
      opacity: 1;
    }
  }

  .mbti-per .tooltip {
    position: absolute;
    right: -14px;
    top: -28px;
    font-size: 9px;
    font-weight: 500;
    color: rgb(0, 0, 0);
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 3px;
    min-width: 3.5ch;
    text-align: center;
    background: rgb(226, 226, 226);
    z-index: 1;
  }

  .tooltip::before {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -2px;
    height: 10px;
    width: 10px;
    z-index: -1;;
    transform: translateX(-50%) rotate(45deg);
 }`;
 
export default Progress;