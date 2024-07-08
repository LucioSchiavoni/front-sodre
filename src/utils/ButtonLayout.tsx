import React from 'react'

interface ButtonProps {
    content: string;
    onClick?: any;
}

const ButtonLayout:React.FC<ButtonProps> = ({content, onClick}) => {
  return (
    <button className='px-3 py-1 rounded-md border font-medium ' onClick={onClick || undefined}>{content}</button>
  )
}

export default ButtonLayout