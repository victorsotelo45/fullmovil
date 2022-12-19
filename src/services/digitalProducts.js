import axios from "axios";
import cookie from "js-cookie";

import cellphoneRecharge from "../components/icons/cellphoneRecharge.svg"
import cellphonePackages from "../components/icons/cellphonePackages.svg"
import entertaiment from "../components/icons/entertaiment.svg"
import bets from "../components/icons/bets.svg"
import games from "../components/icons/games.svg"
import services from "../components/icons/services.svg"
import insurance from "../components/icons/insurance.svg"
//import { types } from "../components/data/productTypes";


const url = "https://testapi.rinnapp.co";

let token = cookie.get('token');
const coverRecharges = 'https://web.fullmovil.com.co/wp-content/uploads/2022/10/Recargas_celular_1024x1024.png';
const coverEntertaiment= '	https://web.fullmovil.com.co/wp-content/uploads/2022/10/Recarga_entretenimiento_1024x1024.png';
const coverGames = 'https://web.fullmovil.com.co/wp-content/uploads/2022/10/Recargas_juegos1024x1024.png';
const coverServices = 'https://web.fullmovil.com.co/wp-content/uploads/2022/10/Recargs_licencias_1024x1024.png';
const coverInsurance = 'https://web.fullmovil.com.co/wp-content/uploads/2022/12/Seguros-Fullmovil-recargas.png';
const coverBets = 'https://web.fullmovil.com.co/wp-content/uploads/2022/10/Recargas_apuestas_1024x1024.png';

const types =
[
    {"code":"2", "description":"Recargas Celular",imageUrl:cellphoneRecharge, coverImage: coverRecharges},
    {"code":"7", "description":"Paquetes Celular","imageUrl":cellphonePackages, coverImage: coverRecharges },
    {"code":"15", "description":"Entretenimiento",imageUrl:entertaiment, coverImage: coverEntertaiment},
    {"code":"13", "description":"Juegos",imageUrl:games, coverImage: coverGames},
    {"code":"14", "description":"Servicios",imageUrl:services, coverImage: coverServices},
    {"code":"10", "description":"Seguros",imageUrl:insurance, coverImage: coverInsurance},
    {"code":"16", "description":"Apuestas",imageUrl:bets, coverImage: coverBets},
]

export const guestAuthentication = async () => {
  const body = {
    deviceId: "6740d7365465bb5c",
    appVersion: "2.7.2",
    deviceMake: "INFINIX MOBILITY LIMITED",
    deviceModel: "Infinix X692",
    deviceOsVersion: "10",
    deviceType: "2",
    deviceTime: "2022-04-18 21:47:29",
    latitude: "0",
    longitude: "0"
  }
   try {
    const resp = await axios.post(`${url}/guest/signIn`, body, {
      headers: {
        language: "es",
        "Content-Type": "application/json",
      },
    });
    token = resp.data.data.token;
    cookie.set('token', token, {
      path: "/"
    });
    console.log(token);
  } catch (error) {
    console.error(error, error.stack);
    console.log(error.response.data);
  }
}

export const isAuthenticated = ()=>{
  return token ? true : false
}

export const getType = async (code) => {  
  
    try {    
      /* const response = await axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    const types = response.data.data;   */ 
       
      const type = types.find((element) => element.code == code);
      return type;
  
    } catch (error) {
      console.error(error, error.stack);
    }
  };

export const getTypes = async () => {
  try {
    /* const response = await axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    const types = response.data.data;   */
    

    return types;

  } catch (error) {
    console.error(error, error.stack);
  }
};

export const getSubTypes = async (type) => {
  try {
    const response = await axios.get(`${url}/mobileWallet/productTypes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    const types = response.data.data;
    const typeRetrived = types.find((element) => element.code == type);
    const subtypes = typeRetrived.subtypes;
    return subtypes;

  } catch (error) {
    console.error(error, error.stack);
  }
};

export const getProducts = async (type,subType) => {

  try {
    const { data: products } = await axios.get(
      `${url}/mobileWallet/products/${type}/${subType}?enabled=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );   
    return products.data;

  } catch (error) {
    console.error(error, error.stack);
  
  }

};

export const createOrder = async (body) => {
  console.log(body)
  return {
      success: true,
      message: 'Orden confirmed as new order',
      data: { orderId: 1641660599165 },
      status: 1,
      statusmsg: 'Nuevo pedido',
      RedirectUrl: 'http://localhost:3000/payment/psePageSimulation',
      RedirectUrlFinish: null,
      paymentId: 'pay_97832123487',
      paymentType: '+Digital(Nequi)'
  };
  // try {
  //   const resp = await axios.post(`${url}/customer/order`, body, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       language: "es",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return resp.data;
  // } catch (error) {
  //   console.error(error, error.stack);
  //   return error.response.data;
  // }
};

export const validatePayment = async (body) => {
  return {
      "_id": {
        "$oid": "6397a00ef9ee26392483839e"
      },
      "code": "pay_637e41670881294",
      "status": 5,
      "statusCode": "PAID",
      "type": 6,
      "typeDescription": "Digital without token",
      "subtype": 21,
      "subtypeDescription": "PSE",
      "date": {
        "timestamp": 1670881294,
        "date": "diciembre 12º 2022, 4:41:34 pm",
        "timezone": "America/Bogota"
      },
      "reason": {
        "id": 1,
        "description": "Recarga de billetera con PSE",
        "code": "WAL-1670881299-0.8437110871794131"
      },
      "gateway": {
        "code": 2,
        "description": "WOMPI"
      },
      "gatewayTransaction": {
        "txId": "112031-1670881294-22881",
        "type": 6,
        "paymentMethod": "PSE",
        "subtype": 21,
        "subtypeDescription": "PSE",
        "providerId": "",
        "providerDescription": "",
        "sourcePayment": "",
        "sourcePaymentMask": "",
        "value": 15000,
        "status": 1,
        "statusCode": "ACEPTADA",
        "statusMessage": "",
        "redirectUrl": "https://sandbox.wompi.co/v1/pse/redirect?ticket_id=112031167088129422881",
        "reason": "Recarga de billetera con PSE",
        "crypto": {
          "currencyName": "",
          "currency": "",
          "networkDescription": "",
          "networkId": "",
          "imageUrl": "",
          "address": "",
          "amount": 0,
          "localCurrency": "",
          "localCurrencyValue": 0,
          "recomendedFee": 0,
          "expirationMinutes": 0,
          "rate": 0,
          "paidAmount": 0,
          "remainingAmount": 0
        }
      },
      "user": {
        "type": 1,
        "id": {
          "$oid": "637e4810aa9472360f105813"
        },
        "name": "Víctor Sotelo ",
        "email": "victorsotelo45@gmail.com",
        "phone": "3012530938",
        "ip": "192.168.20.100",
        "cityDetails": {
          "cityId": "5e8e292ecf89932de22289d1",
          "cityName": "Santander de Quilichao",
          "currency": "COP",
          "currencySymbol": "$",
          "customerWalletLimits": {
            "softLimitForCustomer": -5000,
            "hardLimitForCustomer": -6000
          },
          "currencyAbbr": null
        }
      },
      "validation": {
        "status": 0,
        "statusMsg": "Not validating",
        "validator": ""
      },
      "activities": [
        {
          "origin": "",
          "state": 0,
          "stateCode": "CREATED",
          "date": "diciembre 12º 2022, 4:41:34 pm"
        },
        {
          "origin": "",
          "state": 1,
          "stateCode": "ACEPTADA",
          "date": "diciembre 12º 2022, 4:41:39 pm"
        },
        {
          "origin": "",
          "state": 1,
          "stateCode": "ACEPTADA",
          "date": "diciembre 12º 2022, 4:41:39 pm"
        },
        {
          "origin": "",
          "state": 6,
          "stateCode": "PAID",
          "date": "diciembre 12º 2022, 4:41:39 pm"
        }
      ]
  };
  // try {
  //   const resp = await axios.post(`${url}/digitalProductOrder/validatePayment`, body, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       language: "es",
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   return resp.data;
  // } catch (error) {
  //   console.error(error, error.stack);
  //   return error.response.data;
  // }
};