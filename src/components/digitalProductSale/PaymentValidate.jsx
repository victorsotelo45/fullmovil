import { useState } from 'react';
import { PaymentSuccess } from './PaymentSuccess';
import { PaymentFailed } from './PaymentFailed';
export const PaymentValidate = ({setPage, page, isSuccess, formData, clear}) => {

  return (
    
            isSuccess ? 
            <PaymentSuccess
            setPage={setPage}
            formData={formData}
            clear={clear}
          /> :
          <PaymentFailed
            page={page}
            setPage={setPage}
          />
        
    
  )
}
