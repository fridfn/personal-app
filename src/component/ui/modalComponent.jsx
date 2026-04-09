import react, { useEffect } from "react";
import { useModalContext } from "@/context/modalContext";
import { useScrollLock } from "@/hooks/useScrollLock"
import IonIcon from "@/component/ui/common/ionicon"

const ModalComponent = () => {
  const { modal, modalType, closeModal, modalData = null } = useModalContext()
  const { selectedLink = "No link available", handler, title, description, info, content } = modalData || {};
  const { action, event } = handler || {};
  const localLanguage = localStorage.getItem("language") === "indonesian";
  
  useScrollLock(modal)
  const handlerAction = (eventHandler, event) => {
    if (typeof eventHandler === "function") {
      eventHandler(event);
      closeModal()
      return;
    }
    
    if (selectedLink) window.open(selectedLink, "_blank");
  }
  
  if (!modal || modalType !== "modal") return;
  return (
    <div className="container-popup">
      <div className="popup" data-aos="fade-up" data-aos-duration="400">
        <div className="heading-popup">
          <IonIcon
            name="link"
            className="icon" 
            style={{ "--color": "#ffce62" }}
          />
          <p className="title">
          {
            title ||
            "View Certification"
          }
          </p>
          <div 
            onClick={() => closeModal()}
            style={{ "--color": "#989696" }}
          >
            <IonIcon
              name="close"
              className="icon"
            />
         </div>
        </div>
        <div className="content">
          <p className="description" style={{"--color": "#ccdfeb" }}>
           {
            description ||
            "You'll be redirect to an external page in a new tab"
           }
          </p>
          <p className="description" style={{ "--color": "#989696" }}>
            <i 
             style={{ width: "100%", fontWeight: "400"}}>
              {
               content ||
               handler ||
               selectedLink
              }
            </i>
          </p>
          <p className="description" style={{ "--color": "#ccdfeb" }}>
            {
             info ||
             "Please confirm if you'd like to continue."
            }
          </p>
        </div>
        <div className="wrapper">
          <button
            className="btn-modal"
            style={{ "--color": "#989696" }}
            onClick={() => closeModal()}>
            <IonIcon className="icon" name="close" />
            {localLanguage ? "Batalkan" : "Cancel"}
          </button>
          <button
            className="btn-modal"
            style={{ "--color": "#ffce62" }}
            onClick={() => handlerAction(action, event)}>
            {localLanguage ? "Setuju" : "Proceed"}
            <IonIcon className="icon" name="caret-forward" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;