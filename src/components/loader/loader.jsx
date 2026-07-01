'use client'

import { useEffect } from "react";
import gsap from "gsap";
import "./loader.css";

const PIXEL_COLUMNS = 18;
const PIXEL_ROWS = 10;
const PIXELS = Array.from({ length: PIXEL_COLUMNS * PIXEL_ROWS }, (_, id) => id);

export default function Loader({ onComplete }) {
useEffect(() => {
  const paths = document.querySelectorAll(".loader__logo .path");
  const pixels = gsap.utils.toArray(".loader__pixel");

  paths.forEach((path) => {
    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  const tl = gsap.timeline({
    onComplete: onComplete,
  });

  gsap.set(".loader__pixelField", {
    visibility: "hidden",
  });

  gsap.set(pixels, {
    autoAlpha: 1,
    scale: 1,
    transformOrigin: "50% 50%",
  });

  tl
    // show logo
    .to(".loader__logo", {
      opacity: 1,
      duration: 0.3,
    })

    // draw left
   // LEFT side (slower, elegant start)
.to(".p1, .p2", {
  strokeDashoffset: 0,
  duration: 1.8,
  ease: "power2.out",
  stagger: 0.3,
})
.to({}, { duration: 0.3 })

// RIGHT side (slight overlap, keeps flow)
.to(
  ".p3, .p4",
  {
    strokeDashoffset: 0,
    duration: 1.8,
    ease: "power2.out",
    stagger: 0.3,
  },
  "-=1.2"
)

    .set(".loader__pixelField", {
      visibility: "visible",
    })
    .to(".loader", {
      backgroundColor: "rgba(255,255,255,0)",
      duration: 0.01,
    })
    .to(
      ".loader__logo",
      {
        opacity: 0,
        duration: 1.15,
        ease: "power1.inOut",
      },
      "+=0.28"
    )
    .to(pixels, {
      autoAlpha: 0,
      scale: 0.88,
      x: () => gsap.utils.random(18, 62, 1),
      y: () => gsap.utils.random(-18, 18, 1),
      rotate: () => gsap.utils.random(-4, 4, 0.1),
      duration: 0.72,
      ease: "power2.inOut",
      stagger: (index) => {
        const row = Math.floor(index / PIXEL_COLUMNS);
        const col = index % PIXEL_COLUMNS;
        const band = Math.floor(col / 3);
        return band * 0.19 + row * 0.014 + Math.random() * 0.08;
      },
    }, "<")

    .to(".loader", {
      opacity: 0,
      duration: 0.18,
    }, "+=0.05");
gsap.fromTo(
  ".loader__logo .path",
  { strokeWidth: 10 },
  { strokeWidth: 40, duration: 1.8, ease: "power2.out" }
);

}, []);
   
    
  return (
    <div className="loader">
      <div className="loader__pixelField" aria-hidden>
        {PIXELS.map((id) => (
          <span className="loader__pixel" key={id} />
        ))}
      </div>
      <svg 
  className="loader__logo"
  viewBox="0 0 1720 1720"
  xmlns="http://www.w3.org/2000/svg"
>

  <path className="path p1" d="M411.583 1083.62L68.462 740.498C60.4674 732.505 56.038 721.446 56.9554 710.18C72.474 519.577 217.353 368.789 389.43 349.154C595.151 325.681 799.986 494.197 812.233 727.929C813.37 763.242 790.049 793.97 758.553 801.512C723.654 809.869 685.489 788.137 673.859 750.829C672.939 747.877 672.567 744.736 672.422 741.648C665.055 585.192 534.137 475.448 409.985 487.988C321.017 496.973 240.293 568.276 210.218 667.48C206.031 681.289 210.051 696.321 220.255 706.525C312.183 798.453 404.11 890.38 496.038 982.308C499.327 985.597 502.218 989.364 504.027 993.649C516.413 1022.99 510.239 1056.24 488.947 1076.55C473.073 1091.69 453.547 1095.11 439.547 1095.21C429.045 1095.29 419.01 1091.05 411.583 1083.62Z"
    fill="none" stroke="#695AF2" strokeWidth="40"
    strokeLinecap="round" strokeLinejoin="round"
  />

  <path className="path p2" d="M457.525 637.214L800.646 980.337C808.641 988.33 813.07 999.389 812.153 1010.66C796.635 1201.26 651.756 1352.05 479.678 1371.68C273.957 1395.15 69.1225 1226.64 56.8758 992.906C55.7385 957.593 79.0598 926.865 110.556 919.324C145.454 910.966 183.62 932.698 195.249 970.006C196.169 972.958 196.541 976.1 196.686 979.188C204.053 1135.64 334.972 1245.39 459.124 1232.85C548.092 1223.86 628.816 1152.56 658.891 1053.36C663.077 1039.55 659.057 1024.51 648.853 1014.31C556.925 922.382 464.998 830.456 373.07 738.528C369.781 735.238 366.89 731.472 365.081 727.186C352.696 697.841 358.869 664.6 380.161 644.29C396.036 629.146 415.561 625.729 429.561 625.625C440.064 625.548 450.098 629.788 457.525 637.214Z"
    fill="none" stroke="#695AF2" strokeWidth="40"
    strokeLinecap="round" strokeLinejoin="round"
  />

  <path className="path p3" d="M1262.12 1083.62L918.995 740.498C911.001 732.505 906.571 721.446 907.489 710.18C923.007 519.577 1067.88 368.789 1239.96 349.154C1445.68 325.681 1650.52 494.197 1662.77 727.929C1663.9 763.242 1640.58 793.97 1609.09 801.512C1574.19 809.869 1536.02 788.137 1524.39 750.829C1523.47 747.877 1523.1 744.736 1522.96 741.648C1515.59 585.192 1384.67 475.448 1260.52 487.988C1171.55 496.973 1090.83 568.276 1060.75 667.48C1056.56 681.289 1060.58 696.321 1070.79 706.525C1162.72 798.453 1254.64 890.38 1346.57 982.308C1349.86 985.597 1352.75 989.364 1354.56 993.649C1366.95 1022.99 1360.77 1056.24 1339.48 1076.55C1323.61 1091.69 1304.08 1095.11 1290.08 1095.21C1279.58 1095.29 1269.54 1091.05 1262.12 1083.62Z"
    fill="none" stroke="#695AF2" strokeWidth="40"
    strokeLinecap="round" strokeLinejoin="round"
  />

  <path className="path p4" d="M1308.06 637.214L1651.18 980.337C1659.17 988.33 1663.6 999.389 1662.69 1010.66C1647.17 1201.26 1502.29 1352.05 1330.21 1371.68C1124.49 1395.15 919.656 1226.64 907.409 992.906C906.272 957.593 929.593 926.865 961.089 919.324C995.988 910.966 1034.15 932.698 1045.78 970.006C1046.7 972.958 1047.07 976.1 1047.22 979.188C1054.59 1135.64 1185.51 1245.39 1309.66 1232.85C1398.63 1223.86 1479.35 1152.56 1509.42 1053.36C1513.61 1039.55 1509.59 1024.51 1499.39 1014.31C1407.46 922.382 1315.53 830.456 1223.6 738.528C1220.31 735.238 1217.42 731.472 1215.61 727.186C1203.23 697.841 1209.4 664.6 1230.69 644.29C1246.57 629.146 1266.09 625.729 1280.09 625.625C1290.6 625.548 1300.63 629.788 1308.06 637.214Z"
    fill="none" stroke="#695AF2" strokeWidth="40"
    strokeLinecap="round" strokeLinejoin="round"
  />

</svg>
    </div>
  );
}
