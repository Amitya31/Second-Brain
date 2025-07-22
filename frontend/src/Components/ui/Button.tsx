import type { ButtonHTMLAttributes, ReactElement } from "react"

type Variants = "primary"|"secondary"|"danger"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children:React.ReactNode,
    variant?:Variants,
    className:string
    startIcon?:ReactElement,
    endIcon?:ReactElement
}

function Button({
    children,
    variant = 'primary',
    className,
    startIcon,
    endIcon,
    ...rest
}:ButtonProps) {
    const variants :Record<Variants,string> = {
      "primary":"bg-black text-gray-300 hover:bg-gray-400 dark:bg-",
      "secondary":"bg-gray-400 text-black-300 hover:bg-purple-300",
      "danger":"bg-red-500 text-white hover:bg-red-400"
    }
  return (
    <button
      className={`${variants[variant]} ${className ?? ""} flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ` } 
      {...rest}
    >
      {startIcon && <span>{startIcon}</span>}
      <span>{children}</span>
      {endIcon && <span>{endIcon}</span>}
    </button>
  )
}

export default Button