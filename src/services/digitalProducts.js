import axios from "axios";

import cellphoneRecharge from "../components/icons/cellphoneRecharge.svg"
import cellphonePackages from "../components/icons/cellphonePackages.svg"
import entertaiment from "../components/icons/entertaiment.svg"
import bets from "../components/icons/bets.svg"
import games from "../components/icons/games.svg"
import services from "../components/icons/services.svg"
import insurance from "../components/icons/insurance.svg"
//import { types } from "../components/data/productTypes";


const url = "https://testapi.rinnapp.co/mobileWallet/productTypes";
const mobileWalletUrl = "https://testapi.rinnapp.co/mobileWallet";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlMzE3NjBiODI1NWQ3ZTZhNmJkZmQiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJrZXkiOiJnYWNjIiwiaWF0IjoxNjY2OTE0OTgzLCJleHAiOjE2Njk1MDY5ODMsInN1YiI6Imd1ZXN0In0.Yd7R9n5cm6gjoxgh99S-FYVrsFS1rZlgMEUr2GP6xQE";
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
      console.log("typeFound "+type)
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
    const response = await axios.get(url,
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
    console.log(subtypes)
    return subtypes;

  } catch (error) {
    console.error(error, error.stack);
  }
};

export const getProducts = async (type,subType) => {

  console.log("type "+type)
  console.log("subtype "+subType)

  try {
    const { data: products } = await axios.get(
      `${mobileWalletUrl}/products/${type}/${subType}?enabled=true`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );   
    console.log(products.data) 
    return products.data;

  } catch (error) {
    console.error(error, error.stack);
  
  }

};



