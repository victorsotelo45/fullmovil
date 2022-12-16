export const PsePageSimulation = () => {
  return (
    <>
        <h1>Simulación de pagina de PSE</h1>
        <div className="flex justify-center w-full">
        <button className="bg-green-500 px-4 py-1 rounded"
        onClick={()=>{window.location.href ="http://localhost:3000/payment/summary"}}
        >Pagar</button>
        </div>
    </>
  )
}
