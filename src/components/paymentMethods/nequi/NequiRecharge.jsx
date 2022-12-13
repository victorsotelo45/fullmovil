import { useState } from "react";

import { FormNequi } from "./FormNequi";
import { NavBar } from "../NavBar";
import { PaymentSource } from "../PaymentSource";
import {
  deletePaymentSource,
  getIpClient,
  rechargePaymentSource,
} from "../../../services/paymentMethods";
import Swal from "sweetalert2";
import { DetailsNequi } from "../Details";
import { FormRecharge } from "../FormRecharge";
import { RechargeResultCard } from "../RechargeResultCard";

export const NequiRecharge = () => {
  const [formData, setFormData] = useState({})
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const deleteNequi = async () => {
    const request = {
      id: formData.paymentSource._id,
    };
    const resp = await deletePaymentSource("nequi", request);
    resp && setPage(page - 2);
  };

  const rechargeNequi = async (amount) => {
    const request = {
      sourcePayment: formData.paymentSource.sourcePayment,
      ipAddress: "192.168.0.1",
      amount,
    };
    setIsLoading(true);
    const resp = await rechargePaymentSource("nequi", request);
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
      type={"nequi"}
      page={page}
      setPage={setPage}
    />,
    <FormNequi name={"nequi"} page={page} setPage={setPage} />,
    <DetailsNequi />,
    <FormRecharge
      recharge={rechargeNequi}
      isLoading={isLoading}
    />,
    <RechargeResultCard formData={formData} page={page} setPage={setPage} />,
  ];

  const namePages = [
    formData.name,
    formData.name,
    "Detalles",
    formData.name,
    "Resultado de recarga",
  ];

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
              deleteNequi();
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
