import './Button.css'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  href,
  className = ''
}) {
  const baseClass = `btn btn-${variant} btn-${size}`
  const fullClass = `${baseClass} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={fullClass}>
        {children}
      </a>
    )
  }

  return (
    <button className={fullClass} onClick={onClick}>
      {children}
    </button>
  )
}
