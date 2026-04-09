import { useEffect, useState } from "react";
import ColorThief from "colorthief";

export const useDominantColor = (imageUrl) => {
  const [color, setColor] = useState({
   background: null,
   text: "#eaeaea"
  });

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 10);
      const [r, g, b] = palette[4] || palette[0];
      const background = `rgb(${b + 20}, ${r + 20}, ${b + 30})`;
      
      // const brightness = (r * 299 + g * 587 + b * 114) / 1000;
//       const text = brightness > 128 ? "#00000" : "#eaeaea";
      const clamp = (val) => Math.max(40, Math.min(220, val));
      
      const text = `rgb(${clamp(0 - r)}, ${clamp(20 - g)}, ${clamp(90 - b)})`;
      setColor({ background, text });
    };
  }, [imageUrl]);

  return color;
};