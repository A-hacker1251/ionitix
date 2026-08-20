"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MotionProps {
  children: ReactNode
  className?: string
  initial?: any
  animate?: any
  whileInView?: any
  viewport?: any
  transition?: any
  href?: string
  target?: string
  rel?: string
  "aria-label"?: string
}

export function MotionDiv({
  children,
  ...props
}: MotionProps) {
  return <motion.div {...props}>{children}</motion.div>
}

export function MotionH1({
  children,
  ...props
}: MotionProps) {
  return <motion.h1 {...props}>{children}</motion.h1>
}

export function MotionP({
  children,
  ...props
}: MotionProps) {
  return <motion.p {...props}>{children}</motion.p>
}

export function MotionA({
  children,
  ...props
}: MotionProps) {
  return <motion.a {...props}>{children}</motion.a>
}