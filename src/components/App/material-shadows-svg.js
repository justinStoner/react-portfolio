import React from 'react';
export const MaterialShadowsSvg = () =>{
  return (
    <svg id="svg-dropshadow" width="75px" height="75px">
      <defs>
        <filter id="shadow-2dp" x="-50%" y="-100%" width="200%" height="300%" transform="(150 37.5 37.5)">
          <feOffset in="SourceAlpha" result="offA" dy="2" />
          <feOffset in="SourceAlpha" result="offB" dy="1" />
          <feOffset in="SourceAlpha" result="offC" dy="3" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="2" />
          <feGaussianBlur in="offA" result="blurA" stdDeviation="1" />
          <feGaussianBlur in="offB" result="blurB" stdDeviation="2.5" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="0.5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.20" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-3dp" x="-50%" y="-100%" width="200%" height="300%" transform="(150 37.5 37.5)">
          <feOffset in="SourceAlpha" result="offA" dy="3" />
          <feOffset in="SourceAlpha" result="offB" dy="1" />
          <feOffset in="SourceAlpha" result="offC" dy="3" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="2" />
          <feGaussianBlur in="offA" result="blurA" stdDeviation="2" />
          <feGaussianBlur in="offB" result="blurB" stdDeviation="4" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="1.5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-4dp" x="-50%" y="-100%" width="200%" height="300%" transform="(150 37.5 37.5)">
          <feOffset in="SourceAlpha" result="offA" dy="4" />
          <feOffset in="SourceAlpha" result="offB" dy="1" />
          <feOffset in="SourceAlpha" result="offC" dy="2" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="1" />
          <feGaussianBlur in="offA" result="blurA" stdDeviation="2.5" />
          <feGaussianBlur in="offB" result="blurB" stdDeviation="5" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="2" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-6dp" x="-50%" y="-100%" width="200%" height="300%">
          <feOffset in="SourceAlpha" result="offA" dy="6" />
          <feOffset in="SourceAlpha" result="offB" dy="1" />
          <feOffset in="SourceAlpha" result="offC" dy="3" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="1" />
          <feGaussianBlur in="offA" result="blurA" stdDeviation="5" />
          <feGaussianBlur in="offB" result="blurB" stdDeviation="9" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="2.5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-8dp" x="-50%" y="-100%" width="200%" height="300%">
          <feOffset in="SourceAlpha" result="offA" dy="8" />
          <feOffset in="SourceAlpha" result="offB" dy="3" />
          <feOffset in="SourceAlpha" result="offC" dy="5" />
          <feMorphology in="offA" result="spreadA" operator="dilate" radius="1" />
          <feMorphology in="offB" result="spreadB" operator="dilate" radius="2" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="3" />
          <feGaussianBlur in="spreadA" result="blurA" stdDeviation="5" />
          <feGaussianBlur in="spreadB" result="blurB" stdDeviation="7" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="2.5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-12dp" x="-50%" y="-100%" width="200%" height="300%">
          <feOffset in="SourceAlpha" result="offA" dy="12" />
          <feOffset in="SourceAlpha" result="offB" dy="4" />
          <feOffset in="SourceAlpha" result="offC" dy="6" />
          <feMorphology in="offA" result="spreadA" operator="dilate" radius="1" />
          <feMorphology in="offB" result="spreadB" operator="dilate" radius="3" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="4" />
          <feGaussianBlur in="spreadA" result="blurA" stdDeviation="8" />
          <feGaussianBlur in="spreadB" result="blurB" stdDeviation="11" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="3.5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="shadow-16dp" x="-50%" y="-100%" width="200%" height="300%">
          <feOffset in="SourceAlpha" result="offA" dy="16" />
          <feOffset in="SourceAlpha" result="offB" dy="6" />
          <feOffset in="SourceAlpha" result="offC" dy="8" />
          <feMorphology in="offA" result="spreadA" operator="dilate" radius="2" />
          <feMorphology in="offB" result="spreadB" operator="dilate" radius="5" />
          <feMorphology in="offC" result="spreadC" operator="erode" radius="5" />
          <feGaussianBlur in="spreadA" result="blurA" stdDeviation="12" />
          <feGaussianBlur in="spreadB" result="blurB" stdDeviation="15" />
          <feGaussianBlur in="spreadC" result="blurC" stdDeviation="5" />
          <feFlood floodOpacity="0.14" result="opA" />
          <feFlood floodOpacity="0.12" result="opB" />
          <feFlood floodOpacity="0.40" result="opC" />
          <feComposite in="opA" in2="blurA" result="shA" operator="in" />
          <feComposite in="opB" in2="blurB" result="shB" operator="in" />
          <feComposite in="opC" in2="blurC" result="shC" operator="in" />
          <feMerge>
            <feMergeNode in="shA" />
            <feMergeNode in="shB" />
            <feMergeNode in="shC" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  )
}
