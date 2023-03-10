import React from "react";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { validatePayment } from "../../services/digitalProducts";
import { useNavigate } from "react-router-dom";
import Header from "../../partials/Header";
import "./styles.css";

export const PaymentSummary = () => {
  const [resp, setResp] = useState();
  const formData = JSON.parse(cookie.get("formData"));
  const navigate = useNavigate();
  const orderData = JSON.parse(cookie.get("order"));
  const [status, setStatus] = useState(orderData.data.status);
  const [statusCode, setStatusCode] = useState(orderData.data.statusmsg);

  const validatePaymentOrder = async () => {
    const request = {
      paymentId: orderData.data.paymentId,
    };
    const response = await validatePayment(request);
    if(response){
      setResp(response);
      if(response.error){
        setStatus(response.error.status);
        setStatusCode(response.error.statusCode);
      }else{
        setStatus(response.data.status);
        setStatusCode(response.data.statusCode);
      }
    }else{
      setStatus(4);
      setStatusCode('Error');
    }
  };
 
  const mainStyle = {
    height: "100%",
    background:
      "url(https://web.fullmovil.com.co/wp-content/uploads/2021/11/Full-movil-banner-home-3.png) no-repeat center center fixed",
    WebkitBackgroundSize: "cover",
    MozBackgroundSize: "cover",
    OBackgroundSize: "cover",
    BackgroundSize: "cover",
  };
  useEffect(() => {
    validatePaymentOrder();
  }, []);

  const StatusIcon = () => {
    switch (status) {
      case 0:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        );
      case 2:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 3:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );

      case 4:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 6:
        return (
          <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto">
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
        );
      case 7:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 8:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );
      case 9:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );
      case 11:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        );

      case 12:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fcb900"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-alert-circle"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />
        {/*  Page content */}
        <main className="flex-grow" style={mainStyle}>
          <div className="w-full pt-16 px-3 grid content-center">
            <div className="flex justify-center pt-4">
              <div className="max-w-lg shadow-lg bg-white rounded pb-4">
                <div className="bg-[#001174] text-white p-6">
                  <h2 className="m-0 font-bold text-2xl">Resumen del Pago</h2>
                </div>
                <div className="grid md:grid-cols-2 items-center">
                  <div className="py-4 px-6">
                    <div className="text-gray-800 customFont">
                      Identificaci??n de pago
                    </div>
                    <div className="customFont text-[#001174]">
                      {orderData.data.paymentId}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">
                      Proveedor
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.subTypeDescription}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">
                      Producto
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.productDescription}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">
                      N??mero de celular
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.customerCellphone}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">Email</div>
                    <div className="customFont text-[#001174]">
                      {formData.customerMail}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">
                      M??todo de pago
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.paymentMethodDescription}
                    </div>
                  </div>
                  <div>
                  <div className="flex justify-center">
                    <StatusIcon />
                  </div>
                  <h2 className="text-gray-800 customFont mt-3">
                    Estado del pago
                  </h2>
                  <div className="flex justify-center font-semibold text-2xl">
                    {status==1?'??xito':statusCode}
                  </div>
                  
                  
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-3 sticky bottom-0 mb-2">
              <button
                className="w-full max-w-lg text-center text-xl font-semibold bg-gray-800 text-white pt-3 pr-3 pb-3 pl-3
                hover:bg-gray-600 rounded-md"
                onClick={() => {
                  navigate("/");
                }}
              >
                Regresar
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
