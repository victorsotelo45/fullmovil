import { Route, Routes } from "react-router-dom"
import { PaymentSummary } from "../PaymentSummary"

export const PaymentsMethodsRoutes = () => {
  return (
    <Routes>
        <Route path="/summary/*" element={<PaymentSummary/>}/>
    </Routes>
  )
}
