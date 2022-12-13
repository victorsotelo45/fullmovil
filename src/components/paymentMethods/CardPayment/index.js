import React from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import ReactLoading from "react-loading";

import SupportedCards from "./Cards";
import "react-credit-cards/es/styles-compiled.css";
import Swal from "sweetalert2";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatName,
} from "./utils";

import "./styles.css";

import "react-credit-cards/es/styles-compiled.css";
import {
  addPaymentSource,
  encrypt,
  getIpClient,
} from "../../../services/paymentMethods";
import { ModalForm } from "../ModalForm";

export default class CardPayment extends React.Component {
  state = {
    ip: "",
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    sourcePayment: '',
    stateModal: false,
    issuer: "",
    focused: "",
    formData: null,
    isLoading: false,
    isSuccess: false,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "name") {
      target.value = formatName(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  getIp = async () => {
    this.setState({ ip: await getIpClient() });
  };
  componentDidMount() {
    this.getIp();
  }

  addCard = async () => {
    const expMonth = this.state.expiry.substring(0, 2);
    const expYear = this.state.expiry.substring(3);

    const request = {
      ip: this.state.ip,
      cardNumber: encrypt(this.state.number.replace(/\s+/g, "")),
      cardCvc: encrypt(this.state.cvc),
      cardExpMonth: encrypt(expMonth),
      cardExpYear: encrypt(expYear),
      cardHolder: encrypt(this.state.name),
    };
    this.setState({ isLoading: true });
    const resp = await addPaymentSource("card", request);
    console.log(resp)
    this.setState({ isLoading: false });
    if (resp.success) {
      this.setState({sourcePayment: resp.data.sourcePayment});
      if(resp.data.status == 1){
        this.setState({stateModal: true})
      }else{
      Swal.fire({
        title: "Éxito",
        text: resp.message,
        confirmButtonText: "De acuerdo",
        confirmButtonColor: "red",
        timer: 20000,
      });
      this.props.setPage(this.props.page - 1);
    }
    } else {
      Swal.fire({
        title: "Error",
        confirmButtonText: "De acuerdo",
        text: resp.message,
        confirmButtonColor: "red",
        timer: 20000,
      });
    }
  };

  setStateModal = (value) => {
    this.setState({stateModal: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    this.setState({ formData });
    this.addCard();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div className="w-full">
        {this.state.isLoading && (
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
        
        {this.state.stateModal &&
          <div className="fixed flex z-10 justify-center items-end animationModal">
            <ModalForm cardNumber={this.state.number} sourcePayment={this.state.sourcePayment} setStateModal={this.setStateModal} page={this.props.page} setPage={this.props.setPage}/>
          </div>
        }
          <h1 className='text-[#28367B] font-["Roboto", Sans-serif] font-extrabold'>
            Datos Tarjeta de Credito
          </h1>
          <div className="w-full -mx-3">
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
          </div>
          <form className="w-full max-w-lg" onSubmit={this.handleSubmit}>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full px-3">
                <input
                  type="tel"
                  name="number"
                  placeholder="Numero Tarjeta"
                  pattern="[\d| ]{16,22}"
                  defaultValue={this.state.number}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  className="appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-3 leading-tight  focus:bg-white"
                />
              </div>
              <div className="w-full px-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre en la Tarjeta"
                  defaultValue={this.state.name}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
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
                  defaultValue={this.state.expiry}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  className="appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 mb-3 leading-tight focus:bg-white"
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-3">
                <input
                  type="tel"
                  name="cvc"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  defaultValue={this.state.cvc}
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  className="form-control appearance-none block sm:text-sm h-10 w-full bg-gray-100 border border-gray-300 rounded-md py-3 px-4 leading-tight focus:bg-white"
                />
              </div>
            </div>
            <div className="w-full">
              <button className="btn btn-primary btn-block w-full bg-amber-400 rounded py-3 px-4">
                {this.state.isLoading ? (
                  <>PROCESANDO...</>
                ) : (
                  <>GUARDAR DETALLE DE TARJETA</>
                )}
              </button>
            </div>
          </form>
      
      </div>
    );
  }
}
