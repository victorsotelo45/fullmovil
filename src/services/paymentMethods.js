import axios from "axios";
import paymentMethods from '../components/data/paymentMethods.json'
const url = "https://testapi.rinnapp.co/mobileWallet/productTypes?enabled=true";
const mobileWalletUrl = "https://testapi.rinnapp.co/mobileWallet";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjVlMzE3NjBiODI1NWQ3ZTZhNmJkZmQiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJrZXkiOiJnYWNjIiwiaWF0IjoxNjY2OTE0OTgzLCJleHAiOjE2Njk1MDY5ODMsInN1YiI6Imd1ZXN0In0.Yd7R9n5cm6gjoxgh99S-FYVrsFS1rZlgMEUr2GP6xQE";

export const getPaymentMethods = async () => {
  try {
    /*
    const response = await axios.get(url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          language: "es",
        },
      }
    );
    */
    
    const methods = Promise.resolve(paymentMethods);
    
    return methods;

  } catch (error) {
    console.error(error, error.stack);
  }
};

