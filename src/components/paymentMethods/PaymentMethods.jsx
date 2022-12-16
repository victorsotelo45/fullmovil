import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getPaymentMethods } from "../../services/paymentMethods";

export const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const navigate = useNavigate();
  const { search } =useLocation();
  const query = new URLSearchParams(search);
  const value = query.get('value');
  const reference = query.get('reference');

  const getResponsePaymentMethods = async () => {
    setPaymentMethods(await getPaymentMethods());
  };
  useEffect(() => {
    getResponsePaymentMethods();
  }, []);

  const handleClick = (paymentMethod) => {
    const { code } = paymentMethod;
    switch(code){
      case 401:
        navigate('bancolombia');
        break;
      case 402:
        navigate('nequi');
        break;
      case 201:
        navigate('card');
        break;
      case 101:
        navigate(`/payment/pse?value=${value}&reference=${reference}`);
        break;
    }
  };

  const PaymentMethodCard = ({paymentMethod}) => {
    return (
      <div className="flex rounded-xl bg-white items-center overflow-hidden p-6 h-20 cursor-pointer transition duration-300 hover:scale-[1.02] active:scale-[0.98] [box-shadow:1px_3px_0px_rgba(0,0,0,0.08),-1px_0_0px_rgba(0,0,0,0.08)]"
        onClick={()=>handleClick(paymentMethod)}
      >
        <img
          src={paymentMethod.imageUrl}
          alt={paymentMethod.name}
        
          className="block w-10 h-auto"
        />
        <p className="grow flex justify-center customFont">{paymentMethod.name}</p>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="gray"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
      </div>
    );
  }

  return (
    <>
    <div className="bg-green-500 rounded-xl py-4 px-6 mb-3">
      <p className="text-gray-800 mb-3">Número de pedido: {reference}</p>
      <p className="font-semibold">Total: {value}</p>
    </div>
    <h1 className="flex justify-start mb-0">Medios de pago</h1>
    <div className="customFont text-gray-600">Elige el medio de pago más conveniente</div>
    <div className="flex flex-col justify-center gap-5 mt-5">
      {paymentMethods.map((paymentMethod, item) => (
        <PaymentMethodCard
          key={item}
          paymentMethod={paymentMethod}
        />
      ))}
    </div>
    </>
    
  );
};
