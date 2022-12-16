import ProductSubTypes from "../productSubTypes"

export const DigitalProductRoutes = () => {
  return (
    <Routes>
      <Route path="/type" element={<ProductSubTypes/>} />
      <Route path="/subtype" element={<BancolombiaRecharge/>}/>
      <Route path="/checkout" element={<NequiRecharge/>}/>
      <Route path="/" element={<CreditCardRecharge/>}/>
      <Route path="/pse" element={<PseRecharge/>}/>
      <Route path="/summary" element={<PaymentSummary/>}/>
      <Route path="/psePageSimulation" element={<PsePageSimulation/>}/>
    </Routes>
  )
}
