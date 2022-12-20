import { Route, Routes } from "react-router-dom"
import { PsePageSimulation } from "../../../pages/PsePageSimulation"
import { BancolombiaRecharge } from "../bancolombia/BancolombiaRecharge"
import { CreditCardRecharge } from "../CardPayment/CreditCardRecharge"
import { NequiRecharge } from "../nequi/NequiRecharge"
import { PaymentMethods } from "../PaymentMethods"
import { PaymentSummary } from "../PaymentSummary"
import { PseRecharge } from "../pse/PseRecharge"

export const PaymentsMethodsRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<PaymentMethods/>} />
        <Route path="/bancolombia" element={<BancolombiaRecharge/>}/>
        <Route path="/nequi" element={<NequiRecharge/>}/>
        <Route path="/card" element={<CreditCardRecharge/>}/>
        <Route path="/pse" element={<PseRecharge/>}/>
        <Route path="/summary/*" element={<PaymentSummary/>}/>
        <Route path="/psePageSimulation" element={<PsePageSimulation/>}/>
    </Routes>
  )
}
