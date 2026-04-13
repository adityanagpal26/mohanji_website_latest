'use client'
import { useEffect, useRef, useState } from 'react'

interface Stat { value: string; label: string; numeric: number }

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start || target === 0) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function Counter({ stat, start }: { stat: Stat; start: boolean }) {
  const count = useCountUp(stat.numeric, 2200, start)
  const displayValue = stat.value.includes('+')
    ? `${count}+`
    : stat.value.includes(',')
    ? count.toLocaleString()
    : `${count}`

  return (
    <div className="text-center">
      <p className="font-heading text-4xl md:text-5xl font-semibold text-[#E2B748]">
        {start ? displayValue : '0'}
      </p>
      <p className="text-white/80 mt-2 text-sm md:text-base uppercase tracking-wide">{stat.label}</p>
    </div>
  )
}

export function CounterBar({ stats }: { stats: Stat[] }) {
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat) => (
        <Counter key={stat.label} stat={stat} start={started} />
      ))}
    </div>
  )
}
