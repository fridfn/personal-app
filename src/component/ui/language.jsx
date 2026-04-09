const Language = ({ data, index }) => {
  const { image, language, description, info } = data;
  
  return (
   <div 
    className="container-language"
    data-aos-delay={index * 1500}
    data-aos-duration={index * 1000}
    data-aos={index > 3 ? "zoom-in-down" : ""}>
    <div className="box-icon">
     <img 
      src={image}
      className="image" 
      onContextMenu={(e) => e.preventDefault()} />
    </div>
    <div className="wrapper">
     <p className="title">{language} {info}</p>
     <p className="description">{description}</p>
    </div>
   </div>
  )
}

export default Language;