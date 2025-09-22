

function generateCircleSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="35"
        cy="35"
        r="30"
        stroke="#00B0EF"
        stroke-width="10"
        fill="none"
        stroke-dasharray="188.4"
        stroke-dashoffset="188.4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="188.4"
          to="0"
          dur="900ms"
          fill="freeze"
        />
      </circle>
    </svg>
  `;
}

// other function style for circle, not in use
// function generateFilledCircleSVG() {
//   return `
//     <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
//       <circle
//         cx="35"
//         cy="35"
//         r="30"
//         fill="#00B0EF"
//       >
//         <animate
//           attributeName="r"
//           from="0"
//           to="30"
//           dur="1s"
//           fill="freeze"
//         />
//       </circle>
//     </svg>
//   `;
// }

function generateCrossSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <!-- Linie von oben links nach unten rechts -->
      <line
       x1="15"
       y1="15"
       x2="55"
       y2="55"
       stroke="#FFC000"
       stroke-width="10"
       stroke-linecap="round">

        <animate
         attributeName="stroke-dashoffset"
         from="56.6"
         to="0"
         dur="0.5s"
         fill="freeze"
        />
      </line>

      <!-- Linie von unten links nach oben rechts -->
      <line
       x1="15"
       y1="55"
       x2="55"
       y2="15"
       stroke="#FFC000"
       stroke-width="10"
       stroke-linecap="round">
        <animate
         attributeName="stroke-dashoffset"
         from="56.6"
         to="0"
         dur="0.5s"
         fill="freeze"
         begin="0.5s"
        />
      </line>

      <style>
        line {
          stroke-dasharray: 56.6;
          stroke-dashoffset: 56.6;
        }
      </style>
    </svg>
  `;
}

