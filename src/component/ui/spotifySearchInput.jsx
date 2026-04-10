import React, { useEffect, useState, useRef } from "react";
import { searchSpotify } from "@/utils/searchSpotify";
import IonIcon from "@/component/ui/common/ionicon"
import SpotifyCalendar from "@/component/calendar/spotifyCalendar"
import { useSpotify } from "@/hooks/useSpotify"
import Loader from "@/component/ui/loader"
import EachUtils from "@/utils/EachUtils"
import MusicPreview from "@/component/ui/musicPreview"

export default function SpotifySearchInput({ dateList, today }) {
  const [q, setQ] = useState("");
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const { saveSpotifyMusic } = useSpotify();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  
  useEffect(() => {
    if (!q.trim() && q.length === 0) {
      const fetchInit = async () => {
        const result = await searchSpotify({ query: "nadin_amizah" });
        setSongs(result);
        
        const rawLocal = localStorage.getItem("music");
        const localMusic = rawLocal && rawLocal !== "undefined"
          ? JSON.parse(rawLocal)
          : null;
        
        const music = localMusic || result[0];
        setSelected(music);
        setLoading(false);
      }
      
      fetchInit();
      return;
    }
    
    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const result = await searchSpotify({ query: q });
        setSongs(result);
      } catch (err) {
        setError("EROR", err.message);
      } finally {
        setLoading(false);
      }
    }, 700);
    
    return () => clearTimeout(timeout);
  }, [q]);
  
  const handleSelectedCalendar = (selectedMusic) => {
    setLoading(false)
    setSelected(selectedMusic)
  }
  
  const handleSelected = (selectedMusic) => {
    setSelected(selectedMusic)
    saveSpotifyMusic(selectedMusic)
    localStorage.setItem("music", JSON.stringify(selectedMusic))
  }
  
  return (
    <div className="wrapper-spotify-list">
      <div className="wrapper-content" id="wrapper-spotify"> 
        <div className="wrapper" id="wrapper-calendar">
          <SpotifyCalendar
            today={today}
            date={dateList}
            icons="music_history"
            handler={handleSelectedCalendar}
          />
        </div>
        <div className="wrapper-content" id="wrapper-spotify">
         <p className="info" id="title-info">MUSIC TODAY</p>
          <div className="iframe-box" style={{ height: "80px" }}>
            {!loading && selected?.id ? (
              <MusicPreview 
                selected={selected}
              />
           ) : (<p className="banner information description">ups! there no music this day</p>)}
          </div>
          <input
            value={q}
            className="input-search-spotify"
            onChange={(e) => setQ(e.target.value)}
            placeholder="search songs..."
          />
        </div>
      </div>
      {loading && <p style={{ fontSize: 14 }}>🔍 Searching...</p>}
      {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {songs?.length > 0 && (
         <EachUtils
          of={songs}
          render={(t, index) => (
           <li
             key={t.id}
             onClick={() => handleSelected(t) }
             style={{
               gap: 8,
               padding: 8,
               display: "flex",
               cursor: "pointer",
               alignItems: "center",
               transition: "background 0.2s",
               borderBottom: "1px solid #eee",
               background:
                 selected?.id === t.id ? "rgba(29,185,84,0.08)" : "transparent",
             }}
           >
             <img
               width={48}
               height={48}
               alt={t.name}
               src={t.image}
               style={{ 
                 objectFit: "cover",
                 borderRadius: 6
               }}
             />
             <div className="info-spotify-songs">
               <p className="title">{t.name}</p>
               <div className="info">{t.artist}</div>
             </div>
             <a
               target="_blank"
               rel="noreferrer"
               href={t.spotify_url}
               style={{
                 fontSize: 12,
                 color: "#1DB954",
                 marginLeft: "auto",
                 textDecoration: "none",
               }}
               onClick={(e) => e.stopPropagation()}>
               <IonIcon name="musical-note" className="icon" />
             </a>
           </li>
         )}/>)}
      </ul>
    </div>
  );
}
