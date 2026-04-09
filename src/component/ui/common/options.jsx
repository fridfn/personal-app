import { updateRole } from "/api/role"
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth"
import { personalMessage } from '/api/personalMessage'
import styled from "styled-components";
import { validateAndUpdateRole } from "@/helper/helperValidationRole"
import { useNotificationContext } from "@/context/notificationContext"
import { useRealDatabase } from "@/hooks/useRealDatabase"

const optionsGroup = [
  [
    {
      name: "Add favorite",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      type: "favorite",
    }
  ],
  [
    {
      name: "Edit user",
      icons: (
        <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>
      ),
    },
    {
      name: "Change roles",
      icons: (
       <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 20 20">
         <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.4" d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
       </svg>
      ),
      type: "roles",
    },
    {
      name: "Send message",
      icons: (
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 22 22">
         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>
       </svg>
      ),
      type: "message",
    },
  ],
  [
    {
      name: "Suspend user",
      icons: (
       <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
         <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.4" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
       </svg>
      ),
      type: "delete",
    },
  ],
];

const Options = ({ modal, data, handler }) => {
  const { user } = useAuth();
  const { showNotification } = useNotificationContext();
  const { database: { account } } = useRealDatabase()
  const [roles, setRoles] = useState(null);
  const [rolesValue, setRolesValue] = useState("");
  const [editingType, setEditingType] = useState(null);
  const [message, setMessage] = useState("");
  const [messageValue, setMessageValue] = useState("");
  
  useEffect(() => {
    const initRole = () => {
      try {
        const userRoles = data?.account?.role || "visitor";
        
        if (user?.uid) {
          setRoles(userRoles);
          setRolesValue(userRoles);
        }
      } catch (err) {
        console.error("Init role error:", err);
      }
    };
    initRole();
  }, [user, data]);
  
  useEffect(() => {
   handleUnfocus()
  }, [modal])
  
  const handleSave = async (type, userid) => {
    handler()
    if (type === "roles") {
      try {
        const resultChangeRole = await updateRole(
           userid,
           rolesValue,
         );
        setRoles(rolesValue);
        
        showNotification({
          timer: 5000,
          typeNotification: "success",
          message: "Succes change user role!"
        })
      } catch (err) {
        showNotification({
          timer: 7000,
          typeNotification: "alert",
          message: err.message
        })
      }
    }
    if (type === "message") {
     try {
      const message = await personalMessage(userid, messageValue, account)
      setMessage(messageValue);
      
      showNotification({
        timer: 5000,
        typeNotification: "success",
        message: "Succes send message!"
      })
     } catch (err) {
      showNotification({
        timer: 7000,
        typeNotification: "alert",
        message: err.message
      })
     }
    }
  };

  const handleCancel = (type) => {
    setEditingType(null)
    if (type === "roles") setRolesValue(roles);
    if (type === "message") setMessageValue(message);
  };
  
  const handleUnfocus = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    setEditingType(null);
  }
  
  if (!modal) return;
  return (
   <StyledWrapper>
    <div className="cards-options">
     {optionsGroup.map((group, i) => (
      <React.Fragment key={i}>
       <ul className="list">
        {group.map((opt, j) => (
         <li key={j} className={`item ${opt.type || ""}`}>
          <span className="label">{opt.name}</span>
          {opt.type === "favorite" && (
           <input type="checkbox" className="input" />
          )}
          {opt.type === "roles" && (
           <>
            <input
             className="toogler"
             type="checkbox"
             checked={editingType === "roles"}
             onChange={() =>
              setEditingType(editingType === "roles" ? null : "roles")
             }
            />
            {editingType === "roles" && (
             <label className="input-container">
              <input
               type="text"
               maxLength="15"
               value={rolesValue}
               className="input"
               onChange={(e) => setRolesValue(e.target.value.trim())}
              />
              <div className="icons">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
                onClick={() => handleSave("roles", data?.userid)}
               >
                <path d="M20 6 9 17l-5-5" />
               </svg>
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
                onClick={() => handleCancel("roles")}
               >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
               </svg>
              </div>
             </label>
            )}
           </>
          )}
          {opt.type === "message" && (
           <>
            <input
             className="toogler"
             type="checkbox"
             placeholder="type"
             checked={editingType === "message"}
             onChange={() =>
              setEditingType(editingType === "message" ? null : "message")
             }
            />
            {editingType === "message" && (
             <label className="input-container">
              <input
               type="text"
               value={messageValue}
               className="input"
               onChange={(e) => setMessageValue(e.target.value)}
              />
              <div className="icons">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check"
                onClick={() => handleSave("message", data?.userid)}
               >
                <path d="M20 6 9 17l-5-5" />
               </svg>
               <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x"
                onClick={() => handleCancel("message")}
               >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
               </svg>
              </div>
             </label>
            )}
           </>
          )}
          {opt.icons}
         </li>
        ))}
       </ul>
       {i < optionsGroup.length - 1 && <div className="separator" />}
      </React.Fragment>
     ))}
    </div>
   </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards-options {
    width: 260px;
    border: 2px solid;
    border-radius: 10px;
    padding: 3px 4px;
    .separator {
      width: 100%;
      border: 1px solid #444444;
      border-radius: 10px;
      margin: 5px 0px;
    }
    .list {
      color: #e9e9e9;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 3px;
      padding: 0px .6rem!important;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        padding: 6px 8px;
        border-radius: 5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        user-select: none;

        svg {
          z-index: 1;
          transition: all 0.3s ease;
        }
        &:hover {
          background: #333333;
        }

        .label {
          font-weight: 400;
          transition: all 0.2s ease;
        }

        &.favorite {
          .fav-label {
            position: absolute;
            transform: translateY(-100%) translateX(-15px) scale(0.8);
            opacity: 0;
          }

          .input {
            width: 100%;
            height: 100%;
            position: absolute;
            appearance: none;
            cursor: pointer;
            z-index: 100;
          }

          .input:checked ~ .fav-label {
            transform: translateY(0);
            opacity: 1;
          }

          .input:checked ~ .label:not(.fav-label) {
            transform: translateY(110%) translateX(-6px) scale(0.8);
            opacity: 0;
          }
          .input:checked ~ svg {
            fill: #fff;
          }
        }

        &.delete {
          color: #e3616a!important;
          font-weight: 600!important;
          position: relative;
          &:hover {
            background: #6b2c2b;
          }

          .label {
            transform: translateY(0);
          }

          &:active {
            .label {
              opacity: 0;
              visibility: hidden;
              transform: translateY(100%) translateX(-15px) scale(0.8);
            }
            .action {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }

            &:before {
              animation: delete 2.5s ease-in-out forwards 0.2s;
            }
          }

          .action {
            position: absolute;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-50%) translateX(-15px) scale(0.8);
          }

          &::before {
            content: "";
            position: absolute;
            background-color: #89302d;
            left: 0;
            top: 0;
            height: 100%;
          }
        }

        &.roles, &.message {
          &:has(.toogler:checked:nth-of-type(1)) {
            background-color: #333333;
            overflow: hidden;
            .label {
              opacity: 0;
              transform: translateY(100%);
            }
            > svg {
              transform: translateY(130%);
            }

            .input-container {
              transform: translateY(0);
              
              .icons {
                top: 50%;
              }
            }
          }

          .toogler {
            position: absolute;
            appearance: none;
            width: 100%;
            height: 100%;
          }

          .input-container {
            transform: translateY(-100%);
            width: 100%;
            position: absolute;

            .input {
              width: 60%;
              background: transparent;
              border: none;
              outline: none;
              height: 100%;
              color: #fff;
              padding: 8px 8px;
              font-size: 17px;
              z-index: 100;
            }

            .icons {
              position: absolute;
              top: -50%;
              right: 0%;
              transform: translate(-50%, -50%);
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.3s ease;
              gap: 8px;
              svg {
                background-color: #565656;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s ease;
                &:hover {
                  background-color: #757575;
                }
              }
            }
          }
        }
      }
    }
  }

  @keyframes delete {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }`;

export default Options;
