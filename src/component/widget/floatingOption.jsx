import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import styled from 'styled-components';
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import EachUtils from "@/utils/EachUtils"
import { notificationHelper } from "@/helper/notificationHelper"
const icons = ["color-palette", "person", "log-in", "notifications"]
import { useNotificationContext } from "@/context/notificationContext"
import { useLoadingContext } from "@/context/loadingContext"
import { useModalContext } from "@/context/modalContext"

let metadata = [
  {
    lang: "english",
    title: "Allow Notifications?",
    description: "Stay updated with my latest projects, releases, and personal updates.",
    content: "You can turn off notifications anytime from your browser settings.",
    info: "Would you like to enable notifications?"
  },
  {
    lang: "indonesia",
    title: "Izinkan Notifikasi?",
    description: "Tetap dapatkan informasi terbaru tentang aku, update website, dan informasi terbaru.",
    content: "Kamu bisa mematikan notifikasi kapan saja melalui pengaturan browser.",
    info: "Apakah kamu ingin mengaktifkan notifikasi?"
  }
];

const useHandleOption = ({
    setOpen,
    navigate,
    setSubscribe,
    showNotification,
  }) => {
   const { user } = useAuth();
   const { openModal } = useModalContext()
   const { showLoading, loading, handleOpened } = useLoadingContext();
   const localLanguage = localStorage.getItem("language") === "indonesian" ? "1" : "0"
   
   return [
    {
      icons: "color-palette",
      tooltip: "Theme",
      handler: () => {
        handleOpened((prev) => !prev)
      }
    },
    {
      icons: "person",
      tooltip: "Profile",
      handler: () => {
        const checkLogin = localStorage.getItem("user-data")
        
        setOpen((prev) => !prev)
        showLoading({
          timer: 100,
          path: checkLogin ? "/dashboard/statistics" : "/user/login"
        })
        return;
      }
    },
    {
      icons: "notifications",
      tooltip: "Notification",
      bubble: localStorage.getItem("notification-permission") ? true : false,
      handler: async () => {
        const checkSubscribe = localStorage.getItem("notification-permission")
        
        const granted = !checkSubscribe && await openModal({
          type: "modal",
          data: {
            ...metadata[localLanguage],
            handler: {
              action: (event) => notificationHelper(event),
              event: {
                user,
                showNotification,
              }
            }
          }
         })
        const permission = setSubscribe(granted)
        
        if (!checkSubscribe) return null;
        showNotification({
         timer: 2500,
         typeNotification: "info",
         message: checkSubscribe ? "You're already subscribe notification" : "Success subscribe notification"
       })
      }
    },
  ]
}

const FloatingOption = () => {
  const ref = useRef()
  const navigate = useNavigate()
  const { showNotification } = useNotificationContext();
  const [ isSubscribe, setSubscribe ] = useState(() => {
    return localStorage.getItem("notification-permission")
  })
  const [ isOpen, setOpen ] = useState(false)
  const [ isDragging, setDragging ] = useState(false)
  const [ dragPosition, setDragPosition ] = useState(0)
  const { handleOpened } = useLoadingContext()
  const [ windowSize, setWindowSize ] = useState({ width: 0, height: 0 });
  const [ position, setPosition ] = useState({ x: 0, y: 0 });
  
  const options = useHandleOption({ navigate, setSubscribe, setOpen, showNotification })
  
  useEffect(() => {
    const updateSize = () => {
      setOpen(false)
      handleOpened((prev) => prev = false)
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    updateSize();
    
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  
  useEffect(() => {
    const saved = localStorage.getItem("float-button");
    if (saved) {
      const { x, y } = JSON.parse(saved);
      setPosition({ x, y });
    }
  }, []);
  
  const savePosition = () => {
   if (ref.current) {
     const rect = ref.current.getBoundingClientRect();
     const pos = { x: rect.x, y: rect.y };
     localStorage.setItem("float-button", JSON.stringify(pos));
     setPosition(pos);
   }
  };
  
  return (
    <StyledWrapper>
      <motion.div
        ref={ref}
        drag={true}
        className="dragable"
        onDrag={(handler, info) => { setDragPosition(info.point.x) }}
        onDragEnd={() => setDragging(false)}
        style={{
          x: position.x,
          y: position.y,
          opacity: isDragging || isOpen ? 1 : 0.5
        }}
        onDragStart={() => {
          setOpen(false)
          savePosition()
          setDragging(true)
          handleOpened(false)
         }
        }
        dragConstraints={{ 
          left: 0,
          top: isOpen ? 190 : 10,
          right: windowSize.width - 64,
          bottom: windowSize.height - isOpen ? 500 : 200,
        }}>
         <div className="container-option"
          style={{
            x: position.x,
            y: position.y,
          }}>
          <div className="wrapper-option">
          <AnimatePresence>
           { isOpen && (
             <EachUtils
               of={options}
               render={(value, index) => {
                const { icons, handler, tooltip, bubble } = value;
                
                return (
                 <motion.div
                   key={index}
                   className={`icon-content ${bubble ? 'active' : ''}`}
                   initial={{
                     scale: 0.6,
                     opacity: 0
                   }}
                   animate={{
                     scale: 1,
                     opacity: 1
                   }}
                   exit={{
                     scale: 0.6,
                     opacity: 0
                   }}
                   transition={{
                     duration: 0.15,
                     delay: 0.1 * index
                   }}>
                   <a data-social={tooltip} onClick={handler}>
                     <div className="filled" />
                     <ion-icon name={icons}></ion-icon>
                   </a>
                   <div
                    className="tooltip"
                    style={{ 
                      left: dragPosition < 100 ?
                        tooltip.length > 8 ?
                          "8ch" : "8ch" :
                        tooltip.length > 8 ? 
                          "-12ch" : "-8ch"
                     }}>
                     {tooltip}
                   </div>
                 </motion.div>
               )}}
             />
           )}
          </AnimatePresence>
        </div>
        <button 
          aria-label="settings"
          className="option-button"
          onClick={() => {
           setOpen((prev) => !prev)
           handleOpened((prev) => prev ? false : prev )
          }}
          style={{ scale: isDragging ? 1.15 : 1 }}
        >
          <ion-icon name="settings"></ion-icon>
        </button>
        </div>
      </motion.div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .wrapper-option, .container-option, .dragable {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .wrapper-option {
   flex-direction: column-reverse;
  }
  .dragable {
   inset: 0;
   width: 50px;
   z-index: 25;
   position: fixed;
   top: 50px!important;
   right: 20px!important;
   height: 50px!important;
  }
  .dragable {
   align-items: center;
   justify-content: end;
  }
  .wrapper-option .icon-content {
    position: relative;
    padding: 0.6rem .6rem;
  }
  .wrapper-option .icon-content .tooltip {
    position: absolute;
    top: 100%;
    opacity: 0;
    font-size: 14px;
    padding: 6px 10px;
    border-radius: 5px;
    width: max-content;
    visibility: hidden;
    font-weight: bolder;
    transition: all 0.3s ease;
    transform: translateY(200%);
    background-color: var(--primary-background)!important;
  }
  .wrapper-option .icon-content:hover .tooltip {
    opacity: 1;
    visibility: visible;
    top: -44px;
  }
  .wrapper-option .icon-content a, .option-button {
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.6rem;
    height: 2.6rem;
    border: 0px solid;
    font-size: 25px;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    background-color: var(--primary-background);
  }
  .wrapper-option .icon-content a, .option-button, .wrapper-option .icon-content .tooltip, .wrapper-option .icon-content:before {
    box-shadow: 3px 2px 10px 0px oklch(from var(--main-color) calc(l * .2) calc(c * .7) h);
  }
  .option-button {
   margin-top: 10px;
  }
  .wrapper-option .icon-content a ion-icon {
    position: relative;
    z-index: 1;
    width: 25px;
    height: 25px;
  }
  .wrapper-option .icon-content a .filled {
    position: absolute;
    top: auto;
    bottom: 0;
    left: 0;
    height: 0;
    width: 100%;
    transition: all 0.3s ease-in-out;
  }
  .wrapper-option .icon-content a:hover .filled {
    height: 100%;
  }
  .wrapper-option .icon-content.active:before, .wrapper-option .icon-content.active:after {
   content: "";
   position: absolute;
   width: .6rem;
   height: .6rem;
   border-radius: 50%;
   right: .5rem!important;
   top: .5rem!important;
   z-index: 20;
   background-color: var(--main-color);
  }
  .wrapper-option .icon-content.active:after {
   animation: loop 1s 0s infinite;
   top: -.5rem
  }
  .wrapper-option .icon-content:hover.active:before {
   background-color: var(--primary-color-text);
  }
  .wrapper-option .icon-content a[data-social="linkedin"] .filled,
  .wrapper-option .icon-content a[data-social="linkedin"] ~ .tooltip {
    background-color: #0274b3;
  }
  }`;

export default FloatingOption;
