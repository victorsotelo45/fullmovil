import React from "react";
import { useState, useEffect } from "react";
import cookie from "js-cookie";
import { validatePayment } from "../../services/digitalProducts";
import { useNavigate } from "react-router-dom";
import Header from "../../partials/Header";
import "./styles.css";

export const PaymentSummary = () => {
  const [resp, setResp] = useState({});
  const formData = JSON.parse(cookie.get("formData"));
  const navigate = useNavigate();

  const validatePaymentOrder = async () => {
    const request = {};
    setResp(await validatePayment(request));
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

  return (
    <>
      <div className="flex flex-col h-full">
        {/*  Site header */}
        <Header />
        {/*  Page content */}
        <main className="flex-grow" style={mainStyle}>
          <div className="w-full pt-16 h-full px-3 grid content-center">
            <div className="flex justify-center pt-4">
              <div className="max-w-lg shadow-lg bg-white rounded pb-4">
                <div className="bg-[#001174] text-white p-6">
                  <h2 className="m-0 font-bold text-2xl">Resumen del Pago</h2>
                </div>
                <div className="grid md:grid-cols-2 items-center">
                  <div className="py-4 px-6">
                    <div className="text-gray-800 customFont">Proveedor</div>
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
                      Número de celular
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.customerCellphone}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">Email</div>
                    <div className="customFont text-[#001174]">
                      {formData.customerMail}
                    </div>
                    <div className="text-gray-800 mt-4 customFont">
                      Método de pago
                    </div>
                    <div className="customFont text-[#001174]">
                      {formData.paymentMethodDescription}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-center">
                      {resp.status == 6 ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="text-green-600 w-16 h-16 mx-auto"
                        >
                          <path
                            fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                          ></path>
                        </svg>
                      ) : (
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
                      )}
                    </div>
                    <h2 className="text-gray-800 customFont mt-3">
                      Estado del pago
                    </h2>
                    <div className="flex justify-center font-semibold text-2xl">
                      {resp.status == 6 ? "Pagado" : resp.statusCode}
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
