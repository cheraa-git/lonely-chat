import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"


export const Button: FC<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
  const { className, children, ...args } = props
  return (
      <button
        className={"bg-orange-400 text-white text-base rounded-lg p-1 cursor-pointer transition-opacity hover:opacity-70  " + className}
        {...args}
      >
        {children}
      </button>
  )
}
