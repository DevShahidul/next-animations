"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const numbersData = [
    "M185,131.2c0,25.5-5.1,45.6-15.4,60.3c-10.3,14.7-24.1,22-41.7,22c-17.5,0-31.4-7.3-41.5-22 c-10.1-14.7-15.2-34.8-15.2-60.3v-6.6c0-25.5,5.1-45.7,15.2-60.4C96.6,49.4,110.4,42,128,42c17.5,0,31.4,7.4,41.7,22.1 c10.3,14.8,15.4,34.9,15.4,60.4V131.2z",
    "M87.9,79.2c1.1-0.4,53.7-39.2,54.9-39.1v180.5",
    "M81.7,85.7c-1.4-67,112.3-55.1,90.2,11.6c-12.6,32-70.6,83.7-88.8,113.7h105.8",
    "M74.8,178.5c3,39.4,63.9,46.7,88.6,23.7c34.3-35.1,5.4-75.8-41.7-77c29.9,5.5,68.7-43.1,36.5-73.7 c-23.4-21.5-76.5-11.1-78.6,25",
    "M161.9,220.8 161.9,41 72.6,170.9 208.2,170.9",
    "M183.2,43.7H92.1l-10,88.3c0,0,18.3-21.9,51-21.9s49.4,32.6,49.4,48.2c0,22.2-9.5,57-52.5,57 s-51.4-36.7-51.4-36.7",
    "M177.4,71.6c0,0-4.3-30.3-44.9-30.3s-57.9,45.6-57.9,88.8s9,86.5,56.2,86.5 c38.9,0,50.9-22.3,50.9-60.9c0-17.6-21-44.9-48.2-44.9c-36.2,0-55.2,29.6-55.2,58.2",
    "M73.3,43.7 177.7,43.7 97.9,220.6 ",
    "M126.8,122.8c0,0,48.2-1.3,48.2-42.2s-48.2-39.9-48.2-39.9s-45.9,0-45.9,40.9 c0,20.5,18.8,41.2,46.9,41.2c29.6,0,54.9,18,54.9,47.2c0,0,2,44.9-54.2,44.9c-55.5,0-54.2-43.9-54.2-43.9s-0.3-47.9,53.6-47.9",
    "M78.9,186.3c0,0,4.3,30.3,44.9,30.3s57.9-45.6,57.9-88.8s-9-86.5-56.2-86.5 c-38.9,0-50.9,22.3-50.9,60.9c0,17.6,21,44.9,48.2,44.9c36.2,0,55.2-29.6,55.2-58.2",
  ];
  const [index, setIndex] = useState<number>(0);
  const paths = useRef<SVGPathElement[]>([]);
  const circles = useRef<SVGCircleElement[]>([]);
  const [scope, animate] = useAnimate();
  const nbOfCircles = 30;
  const radius = 20;

  useEffect(() => {
    const length = paths.current[index].getTotalLength();
    const steps = length / nbOfCircles;
    circles.current.forEach((circle, i) => {
      const { x, y } = paths.current[index].getPointAtLength(i * steps);

      animate(circle, { cx: x, cy: y }, { delay: i * 0.025, ease: "easeOut" });
    });
  }, [index]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <div className="w-24">
          <ul>
            {numbersData.map((number, i) => (
              <li key={number} className="w-full">
                <button
                  className="p-2 bg-transparent"
                  onClick={() => setIndex(i)}
                >
                  {i}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-96">
          <svg viewBox="0 0 256 256" filter="url(#filter)">
            <defs>
              <filter id="filter">
                <feGaussianBlur
                  in="SourceAlpha"
                  stdDeviation="20"
                  result="blur"
                />

                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -15"
                  result="filter"
                />
              </filter>
            </defs>
            <g>
              {/* <path className="fill-none stroke-black" d={numbersData[0]} /> */}
              {numbersData.map((path, i) => {
                return (
                  <path
                    className="fill-none stroke-black hidden"
                    key={`p_${i}`}
                    ref={(ref: SVGPathElement | null) => {
                      if (ref) {
                        paths.current[i] = ref;
                      }
                    }}
                    d={path}
                  />
                );
              })}
            </g>
            <g>
              {[...Array(nbOfCircles)].map((circle, i) => {
                return (
                  <circle
                    key={`c_${i}`}
                    cx="128"
                    cy="128"
                    r={radius}
                    ref={(ref) => {
                      if (ref) {
                        circles.current[i] = ref;
                      }
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </main>
  );
}
