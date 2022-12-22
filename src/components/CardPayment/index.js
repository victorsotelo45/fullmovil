import { useState } from "react";
import Card from "react-credit-cards";
import ReactLoading from "react-loading";
import cookie from "js-cookie";

import "react-credit-cards/es/styles-compiled.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "./utils";

import "./styles.css";

import { createOrder } from "../../services/digitalProducts";
import { useNavigate } from "react-router-dom";
import { Modal } from "../paymentMethods/Modal";
import {
  createCardTransaction,
  getAcceptanceToken,
  tgetTokenForCard,
} from "../../services/paymentGateway";

export const CardPayment = ({ formData, setFormData }) => {
  const [state, setState] = useState({
    number: formData.cardNumber,
    name: formData.cardUserName,
    expiry: formData.cardExpiry,
    cvc: formData.cardCvc,
    paymentToken: "no ha cambiado",
    issuer: "",
    focused: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [stateModal, setStateModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState({
        ...state,
        issuer,
      });
    }
  };

  const handleInputFocus = ({ target }) => {
    setState({
      ...state,
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "name") {
      target.value = formatName(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setState({ ...state, [target.name]: target.value });
  };

  const createOrderCard = async (tokenId) => {
    const request = {
      gatewaySessionid: sessionStorage.getItem('sessionId'),
      type: formData.type,
      subType: formData.subType,
      productId: formData.productCode,
      reference: formData.customerCellphone,
      value: formData.productValue,
      paymentMethod: 1,
      paymentToken: tokenId,
      productData: {},
      paymentData: {},
    };
    const resp = await createOrder(request);

    if (!resp.error && resp.success) {
      cookie.set("order", JSON.stringify(resp), {
        path: "/",
      });
      navigate("/payment/summary");
    } else {
      setAlertMessage(resp.message);
      setStateModal(true);
    }
  };

  const createTokenCard = async () => {
    const expMonth = state.expiry.substring(0, 2);
    const expYear = state.expiry.substring(3);

    const requestToken = {
      number: state.number.replace(/\s+/g, ""),
      exp_month: expMonth,
      exp_year: expYear,
      cvc: state.cvc,
      card_holder: state.name,
    };
    const resp = await tgetTokenForCard(requestToken);
    console.log(resp);

    if (resp.status == "CREATED") {
      setState({ ...state, paymentToken: resp.data.id });
      return resp.data.id;
    } else {
      resp.error.messages.number
        ? setAlertMessage(resp.error.messages.number)
        : setAlertMessage(resp.error.messages.card_holder);
      setStateModal(true);
    }
  };

  const getAcceptanceTokenCard = async () => {
    const resp = await getAcceptanceToken();
    console.log(resp.data.presigned_acceptance.acceptance_token);
    return resp.data.presigned_acceptance.acceptance_token;
  };

  const createTransaction = async (acceptanceToken, tokenId) => {
    const request = {
      // El `sessionId` obtenido en la inicialización

      acceptance_token: acceptanceToken,
      amount_in_cents: formData.productValue * 100,
      currency: "COP",
      customer_email: formData.customerMail,
      payment_method: {
        type: "CARD",
        token: tokenId,
        installments: 1,
        payment_description: "Pago a Tienda Popayan card",
      },
      reference: "aaabbbcccdddeeefff002aa",
      customer_data: {
        phone_number: formData.customerCellphone,
        full_name: state.name,
      },
    };
    const resp = await createCardTransaction(request);
    console.log(resp);
    resp.error
      ? console.log(resp.error.messages.reference[0])
      : console.log(resp.data.status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const tokenId = await createTokenCard();
    tokenId && (await createOrderCard(tokenId));
    const acceptanceToken = await getAcceptanceTokenCard();
    acceptanceToken && createTransaction(acceptanceToken, tokenId);

    setIsLoading(false);
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="fixed inset-0 flex z-10 justify-center items-center transition">
          <div className="bg-white opacity-30 fixed inset-0 z-20" />
          <ReactLoading
            type="spin"
            color="black"
            width={"50px"}
            className="z-30"
          />
        </div>
      )}
      {stateModal && (
        <Modal text={alertMessage} setStateModal={setStateModal} />
      )}
      <h1 className='text-[#28367B] font-["Roboto", Sans-serif] font-extrabold'>
        Datos Tarjeta de Credito
      </h1>
      <div className="w-full -mx-3">
        <Card
          number={state.number}
          name={state.name}
          expiry={state.expiry}
          cvc={state.cvc}
          focused={state.focused}
          callback={handleCallback}
        />
      </div>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3">
            <input
              type="tel"
              name="number"
              placeholder="Numero Tarjeta"
              pattern="[\d| ]{16,22}"
              defaultValue={state.number}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-3 leading-tight  focus:bg-white"
            />
          </div>
          <div className="w-full px-3">
            <input
              type="text"
              name="name"
              placeholder="Nombre en la Tarjeta"
              defaultValue={state.name}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-3 leading-tight focus:bg-white"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 md:mb-0">
            <input
              type="tel"
              name="expiry"
              placeholder="Fecha expiración MM/AA"
              pattern="\d\d/\d\d"
              defaultValue={state.expiry}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-3 leading-tight focus:bg-white"
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-3">
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              pattern="\d{3,4}"
              defaultValue={state.cvc}
              required
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="form-control appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:bg-white"
            />
          </div>
        </div>
        <div className="w-full">
          <button className="btn btn-primary btn-block w-full bg-amber-400 rounded py-3 px-4">
            {isLoading ? <>PROCESANDO...</> : <>PAGAR</>}
          </button>
        </div>
      </form>
    </div>
  );
};
