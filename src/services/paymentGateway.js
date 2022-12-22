import axios from "axios";
import { API_WOMPI_HOST, KEYS } from "../lib/envariables";

export const tgetTokenForCard = async (body) => {
  try {
    const resp = await axios.post(`${API_WOMPI_HOST}/tokens/cards`, body, {
      headers: {
        Authorization: `Bearer ${KEYS.publicKey}`,
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const setSessionId = () =>  {
    window.$wompi.initialize(function (data, error) {
        if (error === null) {
          const sessionId = data.sessionId;
          sessionStorage.setItem('sessionId', sessionId);
          // `sessionId` es un string, por ejemplo: "1289_1696830983722-ab493d40c02e-278bab34-323va3"
        }
      });
}

export const getAcceptanceToken = async () => {
  try {
    const resp = await axios.get(
      `${API_WOMPI_HOST}/merchants/${KEYS.publicKey}`
    );
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};

export const createCardTransaction = async (body) => {
  try {
    const resp = await axios.post(`${API_WOMPI_HOST}/transactions`, body, {
      headers: {
        Authorization: `Bearer ${KEYS.privateKey}`,
        "Content-Type": "application/json",
      },
    });
    return resp.data;
  } catch (error) {
    console.error(error, error.stack);
    return error.response.data;
  }
};
