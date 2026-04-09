import React, { useEffect, useState, useRef } from "react";
import IonIcon from "@/component/ui/common/ionicon"
import Marquee from "react-fast-marquee";
import Avatar from "@/component/ui/common/avatar"
import { useDominantColor } from "@/hooks/useDominantColor";

const MusicPreview = ({ selected }) => {
   const timeoutRef = useRef(false);
   const audioRef = useRef(new Audio());
   const currentAudioRef = useRef(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const { background, text } = useDominantColor(selected?.image);
   
  useEffect(() => {
    const audio = audioRef.current;
    audio.preload = "auto";
    audio.setAttribute("playsinline", "");
    
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);
  
  const playAudio = async (linkAudio) => {
    try {
      const audio = audioRef.current;
      
      // kalau lagi play DAN audio sama → toggle off
      if (!audio.paused && currentAudioRef.current === linkAudio) {
        audio.pause();
        audio.currentTime = 0;
        currentAudioRef.current = null;
        return false;
      }
      
      audio.src = linkAudio;
      currentAudioRef.current = linkAudio;
      
      await audio.play();
      updateMediaSessionMetadata(selected)
      return true;
      
    } catch (err) {
      console.log("gagal memutar audio", err);
      return false;
    }
  };
  
  const updateMediaSessionMetadata = (data) => {
    try {
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
           title: data?.name,
           artist: data?.artist,
           album: data?.nama,
           artwork: [
           {
             src: data?.image, // URL gambar
             sizes: "512x512",
             type: "image/png",
           },
          ]
        });
      }
    } catch (err) {
      console.log("metadata error", err);
    }
  };
  
  const iconPlayer = isPlaying ? "pause" : "play";
  return (
    <div className="spotify-iframe" style={{ backgroundColor: background }}>
     <Avatar name={selected?.image} />
     <div className="wrapper-iframe">
       <HandleLongName
         data={{
           color: text,
           name: selected?.name || "Songs",
           artist: selected?.artist || "Artist"
         }}
       />
       <p className="info preview">Pratinjau</p>
     </div>
     <div className="wrapper">
      <div className="action">
        <IonIcon name="musical-notes"  style={{ "--color": text }} className="icon play" />
        <IonIcon name={iconPlayer}  style={{ "--color": text }} className="icon play" onClick={() => playAudio(selected?.preview)} />
      </div>
        <IonIcon name="filter-circle" style={{ "--color": text }} className="icon spotify" />
     </div>
    </div>
  )
}

export default MusicPreview;


const HandleLongName = ({ data }) => {
  const { artist, name, color } = data;
  const nameLength = name.length > 20;
  const artistLength = artist.length > 20;
  
  const [playName, setPlayName] = useState(false);
  const [playArtist, setPlayArtist] = useState(false);

  // delay awal
  useEffect(() => {
    if (nameLength) {
      const timeout = setTimeout(() => setPlayName(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [nameLength]);

  useEffect(() => {
    if (artistLength) {
      const timeout = setTimeout(() => setPlayArtist(true), 2000);
      return () => clearTimeout(timeout);
    }
  }, [artistLength]);

  // handle loop pause
  const handleCycle = (setPlay) => {
    setPlay(false); // stop dulu
    setTimeout(() => {
      setPlay(true); // jalan lagi
    }, 2000); // delay tiap loop
  };

  return (
    <>
      <Marquee
        speed={20}
        direction="right"
        gradientColor="rgba(0,100,200,0)"
        gradientWidth="5%"
        play={playName}
        onCycleComplete={() => handleCycle(setPlayName)}
      >
        <p className="info name" style={{ "--color": color }}>{name}&nbsp;&nbsp;&nbsp;&nbsp;</p>
      </Marquee>

      <Marquee
        speed={20}
        direction="right"
        gradientColor="rgba(0,100,200,0)"
        gradientWidth="5%"
        play={playArtist}
        onCycleComplete={() => handleCycle(setPlayArtist)}
      >
        <p className="info artist" style={{ "--color": color }}>{artist}</p>
      </Marquee>
    </>
  );
};
