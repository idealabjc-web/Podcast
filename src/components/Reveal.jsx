import { useInView } from '../hooks/useInView.js'

export default function Reveal({ className = '', children, ...rest }) {
  const [ref, on] = useInView()
  return <div ref={ref} className={`rv ${className} ${on ? 'in' : ''}`} {...rest}>{children}</div>
}
