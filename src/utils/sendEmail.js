import emailjs from "@emailjs/browser";
import { saveFeedback } from "/api/saveFeedback"

function sendEmail(params) {
  const trimmed = Object.fromEntries(Object.entries(params).map(([key, value]) => [key, value?.trim()]))
  const { name, email, title, message } = trimmed
  
   const templateParams = {
     FromEmail: name,
     user_email: email, 
     subjects: title, 
     pesanEmail: message, 
     to_email: 'faridfathonin@gmail.com',
     reply_to: 'faridfathonin@gmail.com',
   };
   
   saveFeedback(params)
   emailjs.send('service_uuzer5a', 'template_wb424q8', templateParams, 'yZzbJwytB-aSDSuZw').then((response) => {
   
   console.log('SUCCESS!', response.status, response.text);
  }, (err) => {
    console.error('FAILED...', err);
  });
}

export default sendEmail;
