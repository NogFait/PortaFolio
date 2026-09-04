import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

type Segment = {
  text: string
  style?: CSSProperties
}

type Props = {
  segments: Segment[]
  isVisible: boolean
  reduceMotion?: boolean
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.5 }
  }
}

const word = {
  hidden: { opacity: 0, y: '0.6em', filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
}

const SplitText = ({ segments, isVisible, reduceMotion = false }: Props) => {
  if (reduceMotion) {
    return (
      <span>
        {segments.map((segment, i) => (
          <span key={i} style={segment.style}>
            {segment.text}{i !== segments.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    )
  }

  const words = segments.flatMap((segment, segIndex) =>
    segment.text.split(' ').map((text, i) => ({
      text,
      style: segment.style,
      key: `${segIndex}-${i}`
    }))
  )

  return (
    <motion.span
      style={{ display: 'inline' }}
      variants={container}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {words.map((w, i) => (
        <motion.span
          key={w.key}
          variants={word}
          style={{ display: 'inline-block', whiteSpace: 'pre', ...w.style }}
        >
          {w.text}{i !== words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default SplitText
