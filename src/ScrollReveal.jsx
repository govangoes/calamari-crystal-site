import { motion } from 'framer-motion'

export default function ScrollReveal({ children, delay=0, y=20 }){
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
