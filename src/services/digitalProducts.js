import axios from "axios";

import cellphoneRecharge from "../components/icons/cellphoneRecharge.svg"
import entertaiment from "../components/icons/entertaiment.svg"
import bets from "../components/icons/bets.svg"
import games from "../components/icons/games.svg"
import services from "../components/icons/services.svg"
//import { types } from "../components/data/productTypes";


const url = "https://testapi.rinnapp.co/mobileWallet/productTypes?enabled=true";
const mobileWalletUrl = "https://testapi.rinnapp.co/mobileWallet";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlMzE3NjBiODI1NWQ3ZTZhNmJkZmQiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJrZXkiOiJnYWNjIiwiaWF0IjoxNjY2OTE0OTgzLCJleHAiOjE2Njk1MDY5ODMsInN1YiI6Imd1ZXN0In0.Yd7R9n5cm6gjoxgh99S-FYVrsFS1rZlgMEUr2GP6xQE";

const types =
[
    {"code":"7", "description":"Recargas Celular","imageUrl":cellphoneRecharge},
    {"code":"5", "description":"Entretenimiento",imageUrl:entertaiment},
    {"code":"4", "description":"Juegos",imageUrl:games},
    {"code":"3", "description":"Entretenimiento",imageUrl:entertaiment},
    {"code":"2", "description":"Apuestas",imageUrl:bets},
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



