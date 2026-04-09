import React from "react"
import { Loader as Bear } from "@/component/animate/bear" 

const NotFound = ({}) => {
  const isLanguage = localStorage.getItem("language")
  const setMessage = {
   "id-ID": {
     "title": "404 — Aku Gak Menemukannya",
     "description": "Mungkin halaman ini sedang bersembunyi di antara bintang-bintang...",
     "message": "Ssst... jangan berisik ya, aku mau istirahat dulu..."
   },
   "us-EN": {
     "title": "404 — I Couldn’t Find It",
     "description": "Maybe this page is still dreaming among the stars...",
     "message": "Shhh... don’t wake me up, I’m still dreaming of you..."
   }
  }
  
  return (
   <div className="notfound-pages container">
     <Bear message={setMessage["id-ID"]["message"]} />
     <section className="content-notfound">
       <div className="wrapper">
         <h1>{setMessage["id-ID"]["title"]}</h1>
         <p className="description">{setMessage["id-ID"]["description"]}</p>
       </div>
     </section>
   </div>
  )
}

export default NotFound;