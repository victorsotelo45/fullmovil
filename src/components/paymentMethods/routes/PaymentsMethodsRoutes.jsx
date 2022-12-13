import { Route, Routes } from "react-router-dom"
import { BancolombiaRecharge } from "../bancolombia/BancolombiaRecharge"
import { CreditCardRecharge } from "../CardPayment/CreditCardRecharge"
import { NequiRecharge } from "../nequi/NequiRecharge"
import { PaymentMethods } from "../PaymentMethods"
import { PaymentSummary } from "../PaymentSummary"
import { PseRecharge } from "../pse/PseRecharge"

export const PaymentsMethodsRoutes = () => {
  return (
    <div
      className="h-screen sm:px-5 lg:px-12 py-2 bg-[#F6F6F6] flex justify-center"
      style={{ fontFamily: "Arial" }}
    >
       <div className="w-full rounded-xl p-5 pt-2 md:max-w-md">
    <Routes>
        <Route path="/" element={<PaymentMethods/>} />
        <Route path="/bancolombia" element={<BancolombiaRecharge/>}/>
        <Route path="/nequi" element={<NequiRecharge/>}/>
        <Route path="/card" element={<CreditCardRecharge/>}/>
        <Route path="/pse" element={<PseRecharge/>}/>
        <Route path="/summary" element={<PaymentSummary/>}/>
    </Routes>
   
        
      </div>
    </div>
  )
}