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
