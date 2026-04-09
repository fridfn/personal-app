import React, { useState, useEffect } from "react"

export const useValidation = ({ value, type }) => {
  const [ valid, setValid ] = useState(true)
  const [ message, setMessage ] = useState("")
  const localLanguage = localStorage.getItem("language") === "indonesian"
  
  const rule = {
    password: {
      length: {
        regex: /.{5,}/,
        message: localLanguage 
          ? "Gunakan minimal 5 karakter, bisa kombinasi huruf dan angka ya."
          : "Use at least 5 characters — you can mix letters and numbers."
      },
      number: {
        regex: /\d/,
        message: localLanguage 
          ? "Password harus mengandung setidaknya satu angka."
          : "Your password should include at least one number."
      },
      // kamu bisa aktifkan yang di bawah ini kalau nanti mau pakai validasi tambahan:
      // uppercase: {
      //   regex: /[A-Z]/,
      //   message: localLanguage
      //     ? "Gunakan minimal satu huruf kapital."
      //     : "Add at least one uppercase letter."
      // },
      // symbol: {
      //   regex: /[!@#$%^&*(),.?":{}|<>]/,
      //   message: localLanguage
      //     ? "Tambahkan satu karakter spesial (misalnya !, @, #, atau $)."
      //     : "Include at least one special character (!, @, #, $, etc)."
      // }
    },
    email: {
      symbol: {
        regex: /@/,
        message: localLanguage 
          ? "Gunakan format email yang baik dan benar, misalnya nama@gmail.com"
          : "Please enter a valid email format, e.g. name@gmail.com"
      },
      subdomain: {
        regex: /@[a-zA-Z0-9]/,
        message: localLanguage 
          ? "Pastikan ada subdomain setelah @ (seperti @gmail, @yahoo, dll)."
          : "Make sure there’s a subdomain after @ (like @gmail, @yahoo, etc)."
      },
      domain: {
        regex: /\.[a-z]{2,}$/,
        message: localLanguage 
          ? "Tambahkan domain di akhir (misalnya .com, .id, dll)."
          : "Add a domain at the end (e.g. .com, .id, etc)."
      },
      spaces: {
        regex: /^\S+$/,
        message: localLanguage 
          ? "Email tidak boleh mengandung spasi."
          : "Email address cannot contain spaces."
      }
    }
  }
  
  useEffect(() => {
   if (!value) return;
   
   const currentRules = rule[type];
   if (!currentRules) return;
   
   for (let ruleKey in currentRules) {
    const { regex, message } = currentRules[ruleKey];
    
    if (!regex?.test(value)) {
      setMessage(message)
      setValid(true)
      return;
    }
   }
   
   setValid(false)
   setMessage(
     type === "password"
       ? localLanguage
         ? "Kata sandi kamu sudah sesuai format yang benar."
         : "Your password looks good!"
       : localLanguage
         ? "Email kamu sudah dalam format yang benar."
         : "Your email looks good!"
   )
  }, [value, type])
  
  return {  message, valid  }
}