import mbti_enfj from "@/assets/mbti_category/enfj-protagonist-male.svg"
import mbti_enfp from "@/assets/mbti_category/enfp-campaigner-female.svg"
import mbti_entj from "@/assets/mbti_category/entj-commander-female.svg"
import mbti_entp from "@/assets/mbti_category/entp-debater-male.svg"
import mbti_esfj from "@/assets/mbti_category/esfj-consul-male.svg"
import mbti_esfp from "@/assets/mbti_category/esfp-entertainer-female.svg"
import mbti_estj from "@/assets/mbti_category/estj-executive-female.svg"
import mbti_estp from "@/assets/mbti_category/estp-entrepreneur-male.svg"
import mbti_infj from "@/assets/mbti_category/infj-advocate-male.svg"
import mbti_infp from "@/assets/mbti_category/infp-mediator-female.svg"
import mbti_intj from "@/assets/mbti_category/intj-architect-male.svg"
import mbti_intp from "@/assets/mbti_category/intp-logician-female.svg"
import mbti_isfj from "@/assets/mbti_category/isfj-defender-female.svg"
import mbti_isfp from "@/assets/mbti_category/isfp-adventurer-female.svg"
import mbti_istj from "@/assets/mbti_category/istj-logistician-male.svg"
import mbti_istp from "@/assets/mbti_category/istp-virtuoso-male.svg"


const mbtiImages = {
  mbti_enfj,
  mbti_enfp,
  mbti_entj,
  mbti_entp,
  mbti_esfj,
  mbti_esfp,
  mbti_estj,
  mbti_estp,
  mbti_infj,
  mbti_infp,
  mbti_intj,
  mbti_intp,
  mbti_isfj,
  mbti_isfp,
  mbti_istj,
  mbti_istp
};

export const GetImageMBTI = ({ avatarKey }) => {
  return (
   <div className='box'>
    <img 
     alt='avatar' className='image'
     src={mbtiImages[avatarKey]}
     onContextMenu={(e) => e.preventDefault()}
    />
   </div>
  )
};
