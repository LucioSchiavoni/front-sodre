import React from 'react'

interface ButtonProps {
    content: string;
    onClick?: any;
    typeButton?: any;
}

const ButtonLayout:React.FC<ButtonProps> = ({content, onClick, typeButton}) => {
  return (
    <button type={typeButton} className='px-3 py-1 rounded-md border font-medium ' onClick={onClick || undefined}>{content}</button>
  )
}

export default ButtonLayout