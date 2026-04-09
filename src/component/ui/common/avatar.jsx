import React from "react"
import metadata from "@/metadata"

const Avatar = ({ name }) => {
  const getImage = metadata.images[name];
  
  return (
   <div className='box'>
    <img 
     alt='avatar' className='image'
     src={name.length > 15 ? name : getImage}
     onContextMenu={(e) => e.preventDefault()}
    />
   </div>
  )
}

export default Avatar;