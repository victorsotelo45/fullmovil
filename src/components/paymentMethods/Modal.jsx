import { useState, useEffect } from 'react';
import 'animate.css'
export const Modal = ({text, setStateModal}) => { 
    const [animation, setAnimation] = useState('animate__fadeInUp')
    
    useEffect(() => {
        setTimeout(() => {
            setAnimation('animate__fadeOutDown')
            setTimeout(() => {
                setStateModal(false);
              }, 900);
          }, 3000);
    
    }, [])
    
  return (
    <div className={`fixed bottom-10 right-0 left-0 z-10 flex items-center justify-center animate__animated ${animation}`}>
        <div className='w-full md:max-w-md py-3 mx-2 px-5 flex justify-center bg-black/80 text-white rounded-lg'>
            {text}
        </div>
        
    </div>
  )
}
