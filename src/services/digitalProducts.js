import axios from "axios";
import cookie from "js-cookie";

import { 
  API_HOST,
  COVER_ENTERTAINMENT,
  COVER_GAMES,
  COVER_INSURANCE,
  COVER_BETS,
  COVER_RECHARGE,
  COVER_SERVICES,
  CELLPHONE_ICON,
  PACKAGES_ICON,
  ENTERTAIMENT_ICON,
  BETS_ICON,
  GAMES_ICON,
  SERVICES_ICON,
  INSURANCE_ICON,
  API_IP_CLIENT_HOST
 } from "../lib/envariables";


let token = cookie.get('token');
let tokenApi = cookie.get('tokenApi');

const types =
  [
    { "code": "2", "description": "Recargas Celular", imageUrl: CELLPHONE_ICON, coverImage: COVER_RECHARGE },
    { "code": "7", "description": "Paquetes Celular", "imageUrl": PACKAGES_ICON, coverImage: COVER_RECHARGE },
    { "code": "15", "description": "Entretenimiento", imageUrl: ENTERTAIMENT_ICON, coverImage: COVER_ENTERTAINMENT },
    { "code": "13", "description": "Juegos", imageUrl: GAMES_ICON, coverImage: COVER_GAMES },
    { "code": "14", "description": "Servicios", imageUrl: SERVICES_ICON, coverImage: COVER_SERVICES },
    { "code": "10", "description": "Seguros", imageUrl: INSURANCE_ICON, coverImage: COVER_INSURANCE },
    { "code": "16", "description": "Apuestas", imageUrl: BETS_ICON, coverImage: COVER_BETS },
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
    const resp = await axios.post(`${API_HOST}/guest/signIn`, body, {
      headers: {
        language: "es",
        "Content-Type": "application/json",
      },
    });
    token = resp.data.data.token;
    cookie.set('token', token, {
      path: "/"
    });

    const respApi = await axios.post(`http://sales.fullmovil.com.co:7002/guest/signIn`, body, {
      headers: {
        language: "es",
        "Content-Type": "application/json",
      },
    });
    tokenApi = respApi.data.data.token;
    cookie.set('tokenApi', tokenApi, {
      path: "/"
    });
    
  } catch (error) {
    console.error(error, error.stack);
    console.log(error.response.data);
  }
}


export const isAuthenticated = () => {
  return token ? true : false
}


export const getType = async (code) => {

  try {

    const type = types.find((element) => element.code == code);
    return type;

  } catch (error) {
    console.error(error, error.stack);
  }
};


export const getTypes = async () => {
  try {

    return types;

  } catch (error) {
    console.error(error, error.stack);
  }
};


export const getSubTypes = async (type) => {
  try {
    const response = await axios.get(`${API_HOST}/mobileWallet/productTypes`,
      {
        headers: {
          Authorization: `${token}`,
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


export const getProducts = async (type, subType) => {

  try {
    const { data: products } = await axios.get(
      `${API_HOST}/mobileWallet/products/${type}/${subType}?enabled=true`,
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

  try {
    const resp = await axios.post(`http://sales.fullmovil.com.co:7002/digitalProductOrder`, body, {
      headers: {
        Authorization: tokenApi,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    if(error.response){
      return error.response.data;
    }else{
      return error;
    }
  }
};


export const validatePayment = async (body) => {
  try {
    const resp = await axios.post(`http://sales.fullmovil.com.co:7002/digitalProductOrder/validate/${body.paymentId}`, body, {
      headers: {
        Authorization: tokenApi,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    if(error.response){
      return error.response.data;
    }else{
      return;
    }
  }
};