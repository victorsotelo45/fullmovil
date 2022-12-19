import React from "react";
import { render } from "react-dom";
import Card from "react-credit-cards";
import ReactLoading from "react-loading";

import SupportedCards from "./Cards";
import "react-credit-cards/es/styles-compiled.css";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
  formatName,
} from "./utils";

import "./styles.css";

import "react-credit-cards/es/styles-compiled.css";

export default class CardPayment extends React.Component {
  state = {
    number: this.props.formData.cardNumber,
    name: this.props.formData.cardUserName,
    expiry: this.props.formData.cardExpiry,
    cvc: this.props.formData.cardCvc,
    issuer: "",
    focused: "",
    formData: null,
    isLoading: false,
    isSuccess: false,
  };

  getPayment = () => {
    return new Promise((resolve ,reject)=> {this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
      this.setState({isSuccess:true});
      resolve();
    }, 3000);
  })
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
    this.props.setFormData({
      ...this.props.formData,
      cardNumber: this.state.number,
      cardUserName: this.state.name,
      cardExpiry: this.state.expiry,
      cardCvc: this.state.cvc,
    });
    this.getPayment().then(()=>{
    this.props.setIsSuccess(this.state.isSuccess);
    this.props.setPage(this.props.page + 1);
    })
    // this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (

      <div className="w-full">
        {this.state.isLoading ? (
          <div className="w-full h-[48vh] flex items-center justify-center">
            <ReactLoading
              type="spin"
              color="#001174"
              width={"15%"}
              className="mr-3"
            />
          </div>
        ):
        (
        <>
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
              PAY
            </button>
          </div>
        </form>
        </>
        )
  }
      </div>
    );
  }
}
