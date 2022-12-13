import { useState } from "react";
import Card from "react-credit-cards";
import { ModalForm } from "./ModalForm";
import 'animate.css'

export const DetailsCard = ({ formData, page, setPage }) => {
  const { paymentSource } = formData;
  const [stateModal, setStateModal] = useState(false);
  return (
    <>
      <Card
        number={paymentSource.mask}
        name={" "}
        expiry={"****"}
        cvc={"****"}
      />
      {formData.paymentSource.status == 1 && (
        <div
          className="flex rounded-xl bg-white items-center py-3 px-5 mt-5 cursor-pointer transition duration-300 hover:scale-[1.02] active:scale-[0.98] [box-shadow:1px_3px_0px_rgba(0,0,0,0.08),-1px_0_0px_rgba(0,0,0,0.08)]"
          onClick={() => {
            setStateModal(true);
          }}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-alert-circle"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <p className="grow flex justify-center customFont">
            ¡Se requiere validación!
          </p>
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
      )}

      {stateModal && (
        <div className="fixed flex z-10 left-0 right-0 bottom-0 justify-center animate__animated animate__fadeInUp">
          <ModalForm
            cardNumber={formData.paymentSource.mask}
            sourcePayment={formData.paymentSource.sourcePayment}
            setStateModal={setStateModal}
            page={page}
            setPage={setPage}
          />
        </div>
      )}
    </>
  );
};

export const DetailsNequi = () => {
  return <div>Nequi</div>;
};
