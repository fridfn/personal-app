import styled from "styled-components"
import Avatar from "@/component/ui/common/avatar"
import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { useModalContext } from "@/context/modalContext"

const DEFAULT_ITEMS = [
  {
    title: 'Text Animations',
    description: 'Cool text animations for your projects.',
    id: 1,
    image: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg"
  },
  {
    title: 'Animations',
    description: 'Smooth animations for your projects.',
    id: 2,
    image: "profile"
  },
  {
    title: 'Components',
    description: 'Reusable components for your projects.',
    id: 3,
    image: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg"
  },
  {
    title: 'Backgrounds',
    description: 'Beautiful backgrounds and patterns for your projects.',
    id: 4,
    image: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg"
  },
  {
    title: 'Common UI',
    description: 'Common UI components are coming soon!',
    id: 5,
    image: "https://raw.githubusercontent.com/fridfn/sourceimage/refs/heads/main/profile_pict.jpg"
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 900;
const GAP = 5;
const SPRING_OPTIONS = { type: 'spring', stiffness: 350, damping: 50 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}) {
  const containerPadding = 16;
  const { closeModal } = useModalContext()
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  
  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);
  
  useEffect(() => {
   const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      closeModal()
    }
  }
   
   document.addEventListener("touchstart", handleClickOutside)
   
   return () => {
    document.removeEventListener("touchstart",
    handleClickOutside)
   }
  }, [containerRef])
  
  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };
  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
   <StyledCarousel>
   <div className="main-container-carousel-reactbit">
    <div
      ref={containerRef}
      className={`carousel-container-reactbit ${round ? 'round' : ''}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: '50%' })
      }}
    >
      <motion.div
        className="carousel-track-reactbit"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`carousel-item-reactbit ${round ? 'round' : ''}`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : '65vh',
                rotateY: rotateY,
                ...(round && { borderRadius: '50%' })
              }}
              transition={effectiveTransition}
            >
              <div className={`carousel-item-reactbit-header ${round ? 'round' : ''}`}>
                <Avatar name={item.image} />
              </div>
              { item.title && (<div className="carousel-item-reactbit-content">
                <div className="carousel-item-reactbit-title">{item.title}</div>
                <p className="carousel-item-reactbit-description">{item.description}</p>
              </div>)}
            </motion.div>
          );
        })}
      </motion.div>
      <div className={`carousel-indicators-container ${round ? 'round' : ''}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? 'active' : 'inactive'}`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
     </div>
    </div>
   </StyledCarousel>
  );
}

const StyledCarousel = styled.div `
.main-container-carousel-reactbit {
 position: relative;
 top: 0;
 display: inline-block;
 z-index: 99;
 width: 60dvh!important;
 align-items: center!important;
 justifty-items: center!important;
 justify-content: center!important;
 min-height: 100vh!important;
 backdrop-filter: blur(4px);
}

.carousel-container-reactbit {
 min-height: 80vh!important;
 position: relative!important;
 overflow: hidden!important;
 display: flex!important;
 align-items: center!important;
 justify-content: center!important;
 border: 1px solid #555;
 flex-direction: column;
 top: 35px!important;
 left: 35px!important;
 border-radius: 24px;
 --p-distance: 12px;
 padding: 8px;
 padding-top: 25px;
 --outer-r: 24px;
}

.carousel-track-reactbit {
 display: flex;
}

.carousel-item-reactbit {
 position: relative!important;
 display: flex!important;
 flex-shrink: 0!important;
 flex-direction: column;
 min-height: 75vh!important;
 align-items: flex-start!important;
 justify-content: space-between!important;
 border: 1px solid #555;
 border-radius: calc(var(--outer-r) - var(--p-distance));
 overflow: hidden;
 cursor: grab;
}

.carousel-item-reactbit:active {
 cursor: grabbing;
}

.carousel-container-reactbit.round {
 border: 1px solid #555;
}

.carousel-item-reactbit.round {
 background-color: #0d0716;
 position: relative;
 bottom: 0.1em;
 border: 1px solid #555;
 justify-content: center;
 align-items: center;
 text-align: center;
}

.carousel-item-reactbit-header.round {
 padding: 0;
 margin: 0;
}

.carousel-indicators-container.round {
 position: absolute;
 z-index: 2;
 bottom: 3em;
 left: 50%;
 transform: translateX(-50%);
}

.carousel-indicator.active {
 background-color: #333333;
}

.carousel-indicator.inactive {
 background-color: rgba(51, 51, 51, 0.4);
}

.carousel-item-reactbit-header {
 margin-bottom: 16px;
 width: 99.9%;
 height: 100%;
}

.carousel-icon-reactbit {
 height: 16px;
 width: 16px;
 color: #060010;
}

.carousel-item-reactbit-content {
 padding: 20px;
 padding-bottom: 20px;
}

.carousel-item-reactbit-title {
 margin-bottom: 4px;
 font-weight: 900;
 font-size: 18px;
 color: #fff;
}

.carousel-item-reactbit-description {
 font-size: 14px;
 color: #fff;
}

.carousel-indicators-container {
 display: flex;
 width: 100%;
 justify-content: center;
}

.carousel-indicators {
 margin-top: 16px;
 display: flex;
 width: 150px;
 justify-content: space-between;
 padding: 0 32px;
}

.carousel-indicator {
 height: 8px;
 width: 8px;
 border-radius: 50%;
 cursor: pointer;
 transition: background-color 150ms;
}

.carousel-indicator.active {
 background-color: #fff;
}

.carousel-indicator.inactive {
 background-color: #555;
}
`;