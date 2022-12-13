import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getWalletDetail } from "../../services/paymentMethods";

export const RechargeResultCard = ({ formData, setPage }) => {
  const { transactionResponse } = formData;
  const { gatewayTransaction } = transactionResponse;
  const [walletBalance, setWalletBalance] = useState("");
  const navigate = useNavigate();
  const getDetail = async () => {
    const resp = await getWalletDetail();
    setWalletBalance(resp.walletBalance);
  };

  useEffect(() => {
    getDetail();
  }, []);
  return (
    <>
      <div className="bg-white rounded mb-4 mt-4 px-4 py-6">
        <p className="customFont">Tu balance</p>
        <p className="text-xl font-bold">$ {walletBalance}</p>
      </div>
      <h2 className="flex justify-start font-bold">Detalles de recarga</h2>
      <hr className="mt-px mb-6 h-px bg-gray-400 border-0 rounded-xl dark:bg-gray-700" />
      <div className="grid grid-cols-2 gap-3">
        <p className="customFont"> id de transacción</p>
        <p className="flex justify-end text-gray-800 text-right">
          {" "}
          {gatewayTransaction.txId}
        </p>
        <p className="customFont">Código de referencia</p>
        <p className="flex justify-end text-gray-800 text-right">
          {transactionResponse.code}
        </p>
        <p className="customFont">Estado</p>
        <p className="flex justify-end text-gray-800 text-right">
          {gatewayTransaction.statusCode}
        </p>
        <p className="customFont">Tipo de pago</p>
        <p className="flex justify-end text-gray-800 text-right">
          {transactionResponse.typeDescription}
        </p>
        <p className="customFont">Fecha</p>
        <p className="flex justify-end text-gray-800 text-right">
          {transactionResponse.date.date}
        </p>
        <p className="customFont">Valor</p>
        <p className="flex justify-end text-gray-800 text-right">
          $ {gatewayTransaction.value}
        </p>
      </div>
      <button
        className="bg-yellow-400 customFont text-white mt-6 w-full py-2 px-3"
        onClick={() => {
          navigate('/');
        }}
      >
        REGRESAR
      </button>
    </>
  );
};
