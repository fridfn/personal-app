import React from 'react';
import styled from 'styled-components';

const Checkbox = () => {
  return (
    <StyledWrapper>
      <div className="checkbox-wrapper-12">
        <div className="cbx">
          <input id="cbx-12" type="checkbox" />
          <label htmlFor="cbx-12" />
          <svg width={12} height={11} viewBox="0 0 15 14" fill="none">
            <path d="M2 8.36364L6.23077 12L13 2" />
          </svg>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo-12">
              <feGaussianBlur in="SourceGraphic" stdDeviation={4} result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12" />
              <feBlend in="SourceGraphic" in2="goo-12" />
            </filter>
          </defs>
        </svg>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .checkbox-wrapper-12 {
    position: relative;
    margin-top: 5px;
  }

  .checkbox-wrapper-12 > svg {
    position: absolute;
    top: -130%;
    left: -170%;
    width: 110px;
    pointer-events: none;
  }

  .checkbox-wrapper-12 * {
    box-sizing: border-box;
  }

  .checkbox-wrapper-12 input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
    margin: 0;
  }

  .checkbox-wrapper-12 input[type="checkbox"]:focus {
    outline: 0;
  }

  .checkbox-wrapper-12 .cbx {
    width: 20px;
    height: 20px;
    top: calc(100px - 12px);
    left: calc(100px - 12px);
  }

  .checkbox-wrapper-12 .cbx input {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 24px;
    border-radius: 15%;
    border: 3px solid;
  }

  .checkbox-wrapper-12 .cbx label {
    width: 20px;
    height: 20px;
    background: none;
    border-radius: 15%;
    position: absolute;
    top: 0;
    left: 0;
    transform: trasnlate3d(0, 0, 0);
    pointer-events: none;
  }

  .checkbox-wrapper-12 .cbx svg {
    position: absolute;
    top: 5px;
    left: 4px;
    z-index: 1;
    pointer-events: none;
  }

  .checkbox-wrapper-12 .cbx svg path {
    stroke: #fff;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 19;
    stroke-dashoffset: 19;
    transition: stroke-dashoffset 0.3s ease;
    transition-delay: 0.2s;
  }

  .checkbox-wrapper-12 .cbx input:checked + label {
    animation: splash-12 0.6s ease forwards;
  }

  .checkbox-wrapper-12 .cbx input:checked + label + svg path {
    stroke-dashoffset: 0;
  }

  @-moz-keyframes splash-12 {
    40% {
      background: var(--main-color);
      box-shadow: 0 -18px 0 -8px var(--main-color), 16px -8px 0 -8px var(--main-color), 16px 8px 0 -8px var(--main-color),
        0 18px 0 -8px var(--main-color), -16px 8px 0 -8px var(--main-color), -16px -8px 0 -8px var(--main-color);
    }

    100% {
      background: var(--main-color);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @-webkit-keyframes splash-12 {
    40% {
      background: var(--main-color);
      box-shadow: 0 -18px 0 -8px var(--main-color), 16px -8px 0 -8px var(--main-color), 16px 8px 0 -8px var(--main-color),
        0 18px 0 -8px var(--main-color), -16px 8px 0 -8px var(--main-color), -16px -8px 0 -8px var(--main-color);
    }

    100% {
      background: var(--main-color);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @-o-keyframes splash-12 {
    40% {
      background: var(--main-color);
      box-shadow: 0 -18px 0 -8px var(--main-color), 16px -8px 0 -8px var(--main-color), 16px 8px 0 -8px var(--main-color),
        0 18px 0 -8px var(--main-color), -16px 8px 0 -8px var(--main-color), -16px -8px 0 -8px var(--main-color);
    }

    100% {
      background: var(--main-color);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }

  @keyframes splash-12 {
    40% {
      background: var(--main-color);
      box-shadow: 0 -18px 0 -8px var(--main-color), 16px -8px 0 -8px var(--main-color), 16px 8px 0 -8px var(--main-color),
        0 18px 0 -8px var(--main-color), -16px 8px 0 -8px var(--main-color), -16px -8px 0 -8px var(--main-color);
    }

    100% {
      background: var(--main-color);
      box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent,
        32px 16px 0 -10px transparent, 0 36px 0 -10px transparent,
        -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
    }
  }`;

export default Checkbox;