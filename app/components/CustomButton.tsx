"use client"; // turns this into client-side component

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon}: CustomButtonProps) => {
  return (
    <button
    disabled ={false}
    type={ btnType || "button"}
    className={`custom-btn ${containerStyles}`}
    onClick={handleClick}>

        <span className={`flex-1 ${textStyles}`}>
            {title}
        </span>

        {rightIcon && (
          <div className="relativ w-6 h-6">
            <Image src={rightIcon} alt="right icon" fill className='object-contain'/>

          </div>
        )}

    </button>
  )
}

export default CustomButton