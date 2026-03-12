import { useState, useEffect } from 'react'

const MAX_HIGHLIGHTS = 8

// Abbreviate long titles for the central node
function abbreviate(text, maxLen = 28) {
  if (!text || text.length <= maxLen) return text
  return text.slice(0, maxLen - 1).trimEnd() + '\u2026'
}

// Wrap text into lines that fit within a given char width
function wrapText(text, maxChars = 18) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    if (current && (current.length + 1 + word.length) > maxChars) {
      lines.push(current)
      current = word
    } else {
      current = current ? current + ' ' + word : word
    }
  }
  if (current) lines.push(current)
  return lines
}

// Color palettes per theme
const PALETTES = {
  minecraft: [
    '#FFD700', '#7CFC00', '#5DADE2', '#FF6B6B',
    '#FFA500', '#00CED1', '#DA70D6', '#32CD32',
  ],
  lalilo: [
    '#9B59B6', '#E74C8B', '#5DADE2', '#2ECC71',
    '#F39C12', '#1ABC9C', '#E67E22', '#3498DB',
  ],
}

const CSS_ANIM = `
@keyframes mindmap-branch-in {
  0% { opacity: 0; transform: scale(0.3); }
  60% { opacity: 1; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes mindmap-line-in {
  0% { stroke-dashoffset: 300; }
  100% { stroke-dashoffset: 0; }
}
`

export default function MindMap({ title, highlights, theme, reduceAnimations }) {
  const items = (highlights || []).slice(0, MAX_HIGHLIGHTS)
  const count = items.length

  if (count === 0) return null

  const isMinecraft = theme === 'minecraft'
  const palette = PALETTES[isMinecraft ? 'minecraft' : 'lalilo']

  // SVG dimensions
  const W = 700
  const H = 500
  const CX = W / 2
  const CY = H / 2
  const RADIUS = Math.min(W, H) * 0.34

  // Central node dimensions
  const centralW = 180
  const centralH = 56

  // Compute branch positions
  const branches = items.map((text, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2
    const x = CX + RADIUS * Math.cos(angle)
    const y = CY + RADIUS * Math.sin(angle)
    return { text, x, y, angle, color: palette[i % palette.length] }
  })

  const bgColor = isMinecraft ? '#1a1a2e' : '#faf5ff'
  const centralBg = isMinecraft ? '#2d2d44' : '#ffffff'
  const centralBorder = isMinecraft ? '#FFD700' : '#9B59B6'
  const centralTextColor = isMinecraft ? '#FFD700' : '#9B59B6'
  const fontFamily = isMinecraft
    ? "'Courier New', monospace"
    : "'Quicksand', 'Nunito', sans-serif"

  const animDelay = (i) => reduceAnimations ? '0s' : `${i * 0.15}s`
  const animStyle = (i) => reduceAnimations
    ? {}
    : {
        opacity: 0,
        animation: `mindmap-branch-in 0.4s ease-out ${animDelay(i)} forwards`,
      }
  const lineAnimStyle = (i) => reduceAnimations
    ? {}
    : {
        strokeDasharray: 300,
        strokeDashoffset: 300,
        animation: `mindmap-line-in 0.4s ease-out ${animDelay(i)} forwards`,
      }

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      {!reduceAnimations && <style>{CSS_ANIM}</style>}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{
          width: '100%',
          maxWidth: '700px',
          height: 'auto',
          background: bgColor,
          borderRadius: '16px',
          border: isMinecraft ? '2px solid #FFD700' : '2px solid rgba(155,89,182,0.2)',
        }}
        role="img"
        aria-label={`Carte mentale : ${title}. ${count} points cles.`}
      >
        {/* Connectors */}
        {branches.map((b, i) => (
          <line
            key={`line-${i}`}
            x1={CX}
            y1={CY}
            x2={b.x}
            y2={b.y}
            stroke={b.color}
            strokeWidth={isMinecraft ? 3 : 2.5}
            strokeLinecap="round"
            opacity={0.6}
            style={lineAnimStyle(i)}
          />
        ))}

        {/* Central node */}
        <rect
          x={CX - centralW / 2}
          y={CY - centralH / 2}
          width={centralW}
          height={centralH}
          rx={isMinecraft ? 4 : 28}
          ry={isMinecraft ? 4 : 28}
          fill={centralBg}
          stroke={centralBorder}
          strokeWidth={3}
        />
        <text
          x={CX}
          y={CY + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fill={centralTextColor}
          fontFamily={fontFamily}
          fontWeight="700"
          fontSize="13"
        >
          {abbreviate(title)}
        </text>

        {/* Branch nodes */}
        {branches.map((b, i) => {
          const lines = wrapText(b.text, 20)
          const nodeW = 130
          const lineH = 16
          const nodeH = Math.max(40, lines.length * lineH + 16)
          const rx = isMinecraft ? 4 : 14

          return (
            <g key={`branch-${i}`} style={animStyle(i)}>
              <rect
                x={b.x - nodeW / 2}
                y={b.y - nodeH / 2}
                width={nodeW}
                height={nodeH}
                rx={rx}
                ry={rx}
                fill={isMinecraft ? 'rgba(255,255,255,0.07)' : `${b.color}15`}
                stroke={b.color}
                strokeWidth={2}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={b.x}
                  y={b.y - ((lines.length - 1) * lineH) / 2 + li * lineH + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isMinecraft ? b.color : b.color}
                  fontFamily={fontFamily}
                  fontWeight="600"
                  fontSize="11"
                >
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
