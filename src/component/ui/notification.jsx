import React, { useEffect } from "react";
import styled from "styled-components";
import EachUtils from "@/utils/EachUtils"
import { useNotificationContext } from "@/context/notificationContext"

const icons = {
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 
          0 0116 0zm-7-4a1 1 0 
          11-2 0 1 1 0 012 0zM9 
          9a1 1 0 000 2v3a1 1 0 
          001 1h1a1 1 0 100-2v-3a1 
          1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  ),
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
          clipRule="evenodd"
     />
    </svg>
  ),
  alert: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        ></path>
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 
          000 16zm-1-5a1 1 0 102 0 1 
          1 0 00-2 0zm0-6a1 1 0 012 
          0v4a1 1 0 11-2 0V7z"
        clipRule="evenodd"
      />
    </svg>
  ),
}

const Notification = ({ message }) => {
  const { notification, hideNotification, type } = useNotificationContext()
  if (!notification) return null;
  
  return (
    <StyledWrapper>
    <div className="container-notif">
    <EachUtils
      of={notification}
      render={(notifications, index) => {
      const { id, message } = notifications;
      
      return (
        <div 
          key={id}
          data-aos="fade-in"
          data-aos-duration="400"
          className={`notif ${type}-notif`}>
          <div className={`notif-icon ${type}-icon`}>
             {icons[type] || icons["info"]}
          </div>
          <div id="message-notif" className={`${type}-message`}>{message}</div>
          <div className="notif-icon close-icon" onClick={() => hideNotification(id)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path
                d="M15.833 5.342l-1.175-1.175-4.658 
                  4.658-4.658-4.658-1.175 
                  1.175 4.658 4.658-4.658 
                  4.658 1.175 1.175 4.658-4.658 
                  4.658 4.658 1.175-1.175-4.658-4.658z"
                className="close-path"
               />
             </svg>
           </div>
         </div>
        )}}/>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container-notif {
   position: fixed;
   left: 0;
   top: 10px;
   gap: 15px;
   z-index: 999;
   width: 100%;
   flex-direction: column;
   backdrop-filter: blur(2px);
  }
  .notif {
    width: 300px;
    min-height: 35px;
    display: flex;
    position: sticky;
    top: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 3px 10px;
    font-weight: 300;
    background-color: var(--secondary-background)!important;
    box-shadow: 4px 4px 10px -10px rgba(0, 0, 0, 1);
  }
  #message-notif {
   font-weight: 600;
   color: var(--primary-color-text);
   font-size: var(--secondary-font-size);
  }
  .notif svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  .notif-icon {
   display: flex;
   align-items: center;
   justify-content: center;
  }
  .notif-icon svg {
    margin: 5px;
    margin-right: 10px;
  }
  .close-icon {
    margin-left: auto;
    cursor: pointer;
  }
  .close-path {
    fill: grey;
  }
  
  /* SUCCESS */
  .success-notif {
    background-color: #edfbd8;
    border: solid 1px #84d65a;
  }
  .success-icon path {
    fill: #84d65a;
  }

  /* ALERT */
  .alert-notif {
    background-color: #fefce8;
    border: solid 1px #facc15;
  }
  .alert-icon path {
    fill: #facc15;
  }

  /* ERROR */
  .error-notif {
    background-color: #fef2f2;
    border: solid 1px #f87171;
  }
  .error-icon path {
    fill: #f87171;
  }

  /* INFO */
  .info-notif, .error-notif, .alert-notif, .success-notif {
    border: solid 1.8px var(--secondary-border-color)!important;
  }
  .info-icon path {
    fill: var(--main-color);
  }
`;

export default Notification;
