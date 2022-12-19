import axios from "axios";
import CryptoJS from "crypto-js";
// import paymentMethods from '../components/data/paymentMethods.json'
// const url = "https://testapi.rinnapp.co/mobileWallet/productTypes?enabled=true";
// const mobileWalletUrl = "https://testapi.rinnapp.co/mobileWallet";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlMzE3NjBiODI1NWQ3ZTZhNmJkZmQiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJrZXkiOiJnYWNjIiwiaWF0IjoxNjY2OTE0OTgzLCJleHAiOjE2Njk1MDY5ODMsInN1YiI6Imd1ZXN0In0.Yd7R9n5cm6gjoxgh99S-FYVrsFS1rZlgMEUr2GP6xQE";

// export const getPaymentMethods = async () => {
//   try {
//     /*
//     const response = await axios.get(url,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           language: "es",
//         },
//       }
//     );
//     */

//     const methods = Promise.resolve(paymentMethods);

//     return methods;

//   } catch (error) {
//     console.error(error, error.stack);
//   }
// };
const url = "https://testapi.rinnapp.co";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdlNDgxMGFhOTQ3MjM2MGYxMDU4MTMiLCJrZXkiOiJhY2MiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJpYXQiOjE2NzA0NDc2MDMsImV4cCI6MTY3MzAzOTYwMywic3ViIjoiY3VzdG9tZXIifQ.0LLRJA1ZTVmLu92vS7xrfWPCezxNDYz2GttQ4knwpC8";

  export const getWalletDetail = async () => {
    try {
      const { data: response } = await axios.get(
        `${url}/customer/walletDetail`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            language: "es",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, error.stack);
    }
  };



export const getPaymentMethods = async () => {
  try {
    const { data: response } = await axios.get(
      `${url}/mobileWallet/recharge/methods`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, error.stack);
  }
};

export const getPaymentSource = async (type) => {
  try {
    const { data: response } = await axios.get(
      `${url}/customer/paymentSource/${type}/validatedAndPending`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, error.stack);
  }
};

export const addPaymentSource = async (type, body) => {
  try {
    const resp = await axios.post(`${url}/customer/paymentSource/${type}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const validatePaymentSource = async(type, body) => {
  try {
    const resp = await axios.post(`${url}/customer/paymentSource/${type}/validate`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
}

export const deletePaymentSource = async (type, body) => {
  try {
      const resp = await axios.delete(`${url}/customer/paymentSource/${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
          "Content-Type": "application/json",
        },
        data: body
      });
      return resp;
    } catch (error) {
    console.error(error, error.stack);
    return;
  }
};

export const rechargePaymentSource = async (type, body) => {
  try {
    const resp = await axios.post(`${url}/mobileWallet/recharge/${type}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp;
  } catch (error) {
    console.error(error, error.stack);
    return;
  }
};


export const getPseBanks = async () => {
  try {
    const { data: response } = await axios.get(
      `${url}/pse/banks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, error.stack);
  }
};

export const createTransaction = async (type, body) => {
  try {
    const resp = await axios.post(`${url}/payment/${type}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const rechargePse = async (id) => {
  try {
    const { data: response } = await axios.get(
      `${url}/mobileWallet/recharge/pse?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

const key = CryptoJS.enc.Utf8.parse("YM68JyEWezP8Gnog");
const iv = CryptoJS.enc.Hex.parse(0);

// Funcion que permite encriptar
export const encrypt = (data) => {
  const encryptedData = CryptoJS.enc.Utf8.parse(data);

  const encrypted = CryptoJS.AES.encrypt(encryptedData, key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const getIpClient = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error(error);
  }
};

const urlWompi = 'https://sandbox.wompi.co/v1';
const keys = {
  privateKey: 'prv_test_YM68JyEWezP8Gnog0WWiAnIJw1ZKJg6s',
  publicKey: 'pub_test_9vCyax6rgvYZWW8RhTpuEYiL78L4Q9hV'
}

export const getAcceptanceToken = async () => {
  try {
    const resp = await axios.get(`${urlWompi}/merchants/${keys.publicKey}`);
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const generateTokenCard = async (body) => {
  try {
    const resp = await axios.post(`${urlWompi}/tokens/cards`, body, {
      headers: {
        Authorization: `Bearer ${keys.publicKey}`,
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const createPaymentSource = async (body) => {
  try {
    const resp = await axios.post(`${urlWompi}/payment_sources`, body, {
      headers: {
        Authorization: `Bearer ${keys.privateKey}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const createTransactionWompi = async (body) => {
  try {
    const resp = await axios.post(`${urlWompi}/transactions`, body, {
      headers: {
        Authorization: `Bearer ${keys.privateKey}`,
        language: "es",
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};