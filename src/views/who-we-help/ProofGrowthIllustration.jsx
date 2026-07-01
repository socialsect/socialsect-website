'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const CURVE_PATH =
  'M 32 178 C 78 172, 108 128, 148 98 S 232 48, 308 28'

export default function ProofGrowthIllustration() {
  const wrapRef = useRef(null)
  const curveRef = useRef(null)
  const [curveLen, setCurveLen] = useState(400)
  const [active, setActive] = useState(false)

  useLayoutEffect(() => {
    const path = curveRef.current
    if (path) {
      try {
        setCurveLen(path.getTotalLength())
      } catch {
        setCurveLen(400)
      }
    }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setActive(true)
      return undefined
    }

    const el = wrapRef.current
    if (!el) return undefined

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          obs.disconnect()
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -8% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <aside
      ref={wrapRef}
      className={`proof-growth${active ? ' proof-growth--active' : ''}`}
      aria-hidden="true"
      style={{ '--curve-len': curveLen }}
    >
      <div className="proof-growth__panel">
        <svg
          className="proof-growth__svg"
          viewBox="0 0 340 200"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <linearGradient id="proofGrowthFillGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#695AF2" stopOpacity="0.06" />
              <stop offset="55%" stopColor="#695AF2" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#695AF2" stopOpacity="0.22" />
            </linearGradient>
            <linearGradient id="proofGrowthStrokeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#503DD8" />
              <stop offset="100%" stopColor="#695AF2" />
            </linearGradient>
          </defs>

          {/* Axes */}
          <path
            className="proof-growth__axis"
            d="M 28 24 L 28 182 L 320 182"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Horizontal guides */}
          {[46, 78, 110, 142].map((y) => (
            <line
              key={y}
              className="proof-growth__grid"
              x1="36"
              y1={y}
              x2="316"
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          {/* Area under curve */}
          <path
            className="proof-growth__area"
            d={`${CURVE_PATH} L 308 182 L 32 182 Z`}
            fill="url(#proofGrowthFillGrad)"
          />

          {/* Main curve */}
          <path
            ref={curveRef}
            className="proof-growth__curve"
            d={CURVE_PATH}
            fill="none"
            stroke="url(#proofGrowthStrokeGrad)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ '--curve-len': curveLen }}
          />

          {/* Data nodes */}
          {[
            { cx: 32, cy: 178 },
            { cx: 148, cy: 98 },
            { cx: 228, cy: 58 },
            { cx: 308, cy: 28 },
          ].map((pt, i) => (
            <g
              key={`${pt.cx}-${pt.cy}`}
              className="proof-growth__node"
              style={{
                '--node-i': i,
                transformOrigin: `${pt.cx}px ${pt.cy}px`,
              }}
            >
              <circle
                className="proof-growth__node-ring"
                cx={pt.cx}
                cy={pt.cy}
                r="10"
                fill="none"
                stroke="url(#proofGrowthStrokeGrad)"
                strokeWidth="1"
                opacity="0.35"
              />
              <circle
                className="proof-growth__node-dot"
                cx={pt.cx}
                cy={pt.cy}
                r="4.5"
                fill="#FFFFFF"
                stroke="#695AF2"
                strokeWidth="2"
              />
            </g>
          ))}
        </svg>
      </div>
    </aside>
  )
}
