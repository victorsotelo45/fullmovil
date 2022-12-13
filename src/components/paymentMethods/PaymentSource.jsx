import { useState, useEffect } from "react";

import ReactLoading from "react-loading";

import { getPaymentSource } from "../../services/paymentMethods";
import { Modal } from "./Modal";

export const PaymentSource = ({
  formData,
  setFormData,
  type,
  page,
  setPage,
}) => {
  const [paymentSources, setPaymentSources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemSelected, setItemSelected] = useState();
  const [stateModal, setStateModal] = useState(false);

  const getListPaymentSource = async () => {
    setPaymentSources(await getPaymentSource(type));
    setIsLoading(false);
  };
  useEffect(() => {
    getListPaymentSource();
  }, []);

  const PaymentSourceCard = ({ item, paymentSource }) => {
    return (
      <div
        className={`flex rounded-xl  items-center p-3 cursor-pointer transition duration-300 hover:scale-[1.02] active:scale-[0.98] [box-shadow:1px_3px_0px_rgba(0,0,0,0.08),-1px_0_0px_rgba(0,0,0,0.08)] ${
          item == itemSelected ? "bg-gray-400" : "bg-white"
        }`}
        onClick={() => {
          itemSelected == item ? setItemSelected(null) : setItemSelected(item);
        }}
      >
        <img
          src={paymentSource.imageUrl}
          alt={paymentSource.franchise}
          height="30px"
          className="block w-10 h-auto"
        />
        <p className="grow flex justify-center customFont">
          {paymentSource.mask}
        </p>
        {paymentSource.status == 1 && (
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
            className="feather feather-alert-circle mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        )}
        <button
          onClick={() => {
            setFormData({ ...formData, paymentSource });
            setPage(page + 2);
          }}
          className={`${
            item == itemSelected ? "bg-gray-300" : "bg-[rgba(0,0,0,0.08)]"
          } p-1 rounded-full`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={item == itemSelected ? "white" : "#374151"}
          >
            <path d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z" />
          </svg>
        </button>
      </div>
    );
  };

  return isLoading ? (
    <div className="flex justify-center">
      <ReactLoading type="spin" color="gray" width={"8%"} className="mr-3" />
      cargando...
    </div>
  ) : paymentSources.length != 0 ? (
    <>
      <div className="space-y-3 h-[77vh] overflow-y-scroll p-3">
        {paymentSources.map((paymentSource, item) => (
          <PaymentSourceCard
            key={item}
            item={item}
            paymentSource={paymentSource}
          />
        ))}
      </div>
      {itemSelected != null && (
        <button
          className="bg-lime-600 customFont text-white my-4 w-full py-2 px-3"
          onClick={() => {
            if (paymentSources[itemSelected].status == 2) {
              setFormData({
                ...formData,
                paymentSource: paymentSources[itemSelected],
              });
              setPage(3);
            } else {
              setStateModal(true);
            }
          }}
        >
          SELECCIONAR
        </button>
      )}
      {stateModal && <Modal text={'La tarjeta seleccionada no se encuentra validada'} setStateModal={setStateModal}/>}
    </>
  ) : (
    <>
      <p className="flex justify-center content-center text-gray-800">
        No tienes ningún {formData.name} vinculado
      </p>
    </>
  );
};
