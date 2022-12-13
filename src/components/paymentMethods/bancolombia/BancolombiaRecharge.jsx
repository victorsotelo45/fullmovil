import { useState } from "react";
import { createTransaction } from "../../../services/paymentMethods";
import { FormRecharge } from "../FormRecharge";
import { NavBar } from "../NavBar";
import { RechargeResultCard } from "../RechargeResultCard";

export const BancolombiaRecharge = ({ formData, setIsStartPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  
  const recharge = async(value)=>{
    setIsLoading(true);
    const transaction = await createBancolombiaTransaction(value);
    setIsLoading(false);
    window.open(transaction.data.data.redirectUrl);
    
    // const resp = await rechargePse(transaction.data.data.transactionID);
    // setFormData({
    //   ...formData,
    //   transactionResponse: resp.payment
    // })
    setPage(0);
  }
  const createBancolombiaTransaction = async(value)=>{
    const request = {      
      value: value    
      };
      const resp = await createTransaction('bancolombiaButton',request);
      return resp;
  }
  const components = [
    <FormRecharge recharge={recharge} isLoading={isLoading} />,
    <RechargeResultCard formData={formData} page={page} setPage={setPage} />,
  ];
  return (
    <>
      <NavBar
        name={formData.name}
        page={page}
        setPage={setPage}
        setIsStartPage={setIsStartPage}
      />
      {components[page]}
    </>
  );
};
