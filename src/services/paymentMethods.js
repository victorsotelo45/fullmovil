import axios from "axios";
import { API_HOST } from "../lib/envariables";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdlNDgxMGFhOTQ3MjM2MGYxMDU4MTMiLCJrZXkiOiJhY2MiLCJkZXZpY2VJZCI6IjY3NDBkNzM2NTQ2NWJiNWMiLCJpYXQiOjE2NzA0NDc2MDMsImV4cCI6MTY3MzAzOTYwMywic3ViIjoiY3VzdG9tZXIifQ.0LLRJA1ZTVmLu92vS7xrfWPCezxNDYz2GttQ4knwpC8";

export const getPseBanks = async () => {
  try {
    const { data: response } = await axios.get(
      `${API_HOST}/pse/banks`,
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

const keys = {
  privateKey: 'prv_test_YM68JyEWezP8Gnog0WWiAnIJw1ZKJg6s',
  publicKey: 'pub_test_9vCyax6rgvYZWW8RhTpuEYiL78L4Q9hV'
}