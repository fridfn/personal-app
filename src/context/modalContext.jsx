import { useState, useEffect, useContext, createContext } from "react"

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [ timer, setTimer ]= useState(4000)
  const [ modal, setModal ] = useState(false)
  const [ message, setMessage ] = useState("")
  const [ modalData, setModalData ]= useState([])
  const [ modalType, setModalType ] = useState("")
  
  const openModal = ({ data, index, time, type }) => {
    const selectedLink = Array.isArray(data) ? data[index] : data;
    setModalData({
      ...data,
      selectedLink,
    })
    
    setModal(true)
    setModalType(type)
    if (!time) setTimer(false)
    if (time) setTimer(time ?? 4000)
  }
  
  const closeModal = () => {
    setModalData(null)
    setModalType("")
    setModal(false)
    setMessage("")
  }
  
  useEffect(() => {
    let timerPopup;
    if (timer && modal) {
      timerPopup = setTimeout(() => {
        setModal(false)
      }, 4000)
    }
    
    if (timer) {
      return () => clearTimeout(timerPopup)
    }
  }, [modal])
  
  return (
   <ModalContext.Provider
     value={{
       modal,
       modalData,
       modalType,
       openModal,
       closeModal,
       updateMessage: (text) => setMessage(text),
     }}>
     {children}
   </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)