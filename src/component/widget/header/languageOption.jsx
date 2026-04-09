import metadata from "@/metadata"
import EachUtils from "@/utils/EachUtils"
const getImage = (name) => { return metadata.images[name] }

const LanguageOption = ({ currentLanguage, onChangeLanguage }) => {
 
  return (
   <div className="box-option">
     <EachUtils
       of={[
         { name: "english" },
         { name: "indonesian" }
       ]}
       render={(value, index) => {
        const isLanguage = value.name !== currentLanguage;
        
        return (
          isLanguage && (
           <div
             key={index}
             className="items-option"
             onClick={() => onChangeLanguage(value.name)}>
             <div id='lang' className='box'>
               <img className='image' src={getImage(value.name)} />
             </div>
             <p className="info" style={{ textTransform: 'capitalize' }}>
               {value.name}
             </p>
           </div>
         ))
       }}
     />
   </div>
  )
}

export default LanguageOption;