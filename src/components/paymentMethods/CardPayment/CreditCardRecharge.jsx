import { useState } from "react";

import CardPayment from ".";
import {
  deletePaymentSource,
  rechargePaymentSource,
} from "../../../services/paymentMethods";
import { DetailsCard } from "../Details";
import { NavBar } from "../NavBar";
import { PaymentSource } from "../PaymentSource";

import Swal from "sweetalert2";
import { FormRecharge } from "../FormRecharge";
import { RechargeResultCard } from "../RechargeResultCard";

export const CreditCardRecharge = () => {
  const [formData, setFormData] = useState({})
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const rechargeCard = async (amount) => {
    const request = {
      sourcePayment: formData.paymentSource.sourcePayment,
      ipAddress: "192.168.0.1",
      amount,
    };
    setIsLoading(true);
    const resp = await rechargePaymentSource("card", request);
    setIsLoading(false);
    setFormData({
      ...formData,
      transactionResponse: resp.data.data.payment,
    });
    setPage(page + 1);
  };
  const components = [
    <PaymentSource
      formData={formData}
      setFormData={setFormData}
      type={"card"}
      page={page}
      setPage={setPage}
    />,
    <CardPayment formData={formData} page={page} setPage={setPage} />,
    <DetailsCard formData={formData} page={1} setPage={setPage} />,
    <FormRecharge recharge={rechargeCard} isLoading={isLoading} />,
    <RechargeResultCard formData={formData} page={page} setPage={setPage} />,
  ];
  const namePages = [
    formData.name,
    formData.name,
    "Detalles",
    formData.name,
    "Resultado de recarga",
  ];
  const deleteCard = async () => {
    const request = {
      franchise: formData.paymentSource.franchise,
      sourcePayment: formData.paymentSource.sourcePayment,
    };
    const resp = await deletePaymentSource("card", request);
    resp && setPage(page - 2);
  };

  const ButtonAdd = () => {
    return (
      <button
        className="font-medium text-3xl"
        onClick={() => {
          setPage(page + 1);
        }}
      >
        +
      </button>
    );
  };
  const ButtonDelete = () => {
    return (
      <button
        onClick={() => {
          Swal.fire({
            title: "Alerta",
            text: "¿Estás seguro de que quieres borrar?",
            confirmButtonText: "De acuerdo",
            confirmButtonColor: "red",
            showCancelButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              deleteCard();
            }
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="red"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-trash-2"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    );
  };
  return (
    <>
      <NavBar
        name={namePages[page]}
        propsButton={page == 0 ? <ButtonAdd /> : page == 2 && <ButtonDelete />}
        page={page != 0 && 1}
        setPage={setPage}
      />
      {components[page]}
    </>
  );
};
