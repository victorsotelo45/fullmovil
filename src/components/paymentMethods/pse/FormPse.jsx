import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactLoading from "react-loading";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {
  createTransaction,
  getPseBanks,
  rechargePse,
} from "../../../services/paymentMethods";
import { Modal } from "../Modal";
import { useLocation } from "react-router-dom";

export const FormPse = ({ formData, setFormData, page, setPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [alert, setAlert] = useState("");

  const { search } =useLocation();
  const query = new URLSearchParams(search);
  const value = query.get('value');
  const reference = query.get('reference');
  
  const getBank = async () => {
    const resp = await getPseBanks();
    setBanks(resp);
  };

  const recharge = async (values) => {
    setIsLoading(true);
    const transaction = await createPseTransaction(values);
    window.open(transaction.data.data.redirectUrl);
    setIsLoading(false);
    
    const resp = await rechargePse(transaction.data.data.transactionID);
    if (resp.payment) {
      setFormData({
        ...formData,
        transactionResponse: resp.payment,
      });
      setPage(page + 1);
    } else {
      setAlert(resp.message);
      setStateModal(true);
    }
  };
  const createPseTransaction = async (values) => {
    const request = {
      userType: "0",
      bank: values.bank,
      providerDescription: banks[values.bank].bankName,
      value: values.valueRecharge,
      docType: values.documentType,
      docNumber: values.documentNumber,
      ip: "192.168.20.100",
    };
    const resp = await createTransaction("pse", request);
    return resp;
  };
  useEffect(() => {
    getBank();
  }, []);

  return (
    <>
    <div className="bg-white rounded-xl p-3 mb-3 mx-2">
      <p>Número de pedido: {reference}</p>
      <p className="font-semibold">Total: {value}</p>
    </div>

      {isLoading && (
        <div className="fixed inset-0 flex z-10 justify-center items-center transition">
          <div className="bg-white opacity-30 fixed inset-0 z-20" />
          <ReactLoading
            type="spin"
            color="black"
            width={"50px"}
            className="z-30"
          />
        </div>
      )}
      {stateModal && <Modal text={alert} setStateModal={setStateModal} />}
      <Formik
        initialValues={{
          valueRecharge: "",
          bank: "",
          documentType: "",
          documentNumber: "",
        }}
        validationSchema={Yup.object({
          valueRecharge: Yup.number()
            .max(9999999999, "Must be 10 characters or less")
            .required("Required"),
          bank: Yup.string().required("Required"),
          documentType: Yup.string().required("Required"),
          documentNumber: Yup.number()
            .max(9999999999, "Must be 10 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          recharge(values);
        }}
      >
        <Form className="w-full max-w-sm bg-white shadow-md rounded px-8 py-6 mb-4 mt-2">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="valueRecharge"
          >
            Ingrese el valor a recargar
          </label>
          <Field
            className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="valueRecharge"
            type="tel"
          />
          <div className="text-red-600">
            <ErrorMessage name="valueRecharge" />
          </div>

          <label
            className="block text-gray-700 text-sm font-bold mt-4"
            htmlFor="bank"
          >
            Banco
          </label>
          <Field
            className="bg-[#F6F6F6] shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="bank"
            as="select"
          >
            {banks.map((bank) => (
              <option key={bank.bankCode} value={bank.bankCode}>
                {bank.bankName}
              </option>
            ))}
          </Field>
          <div className="text-red-600">
            <ErrorMessage name="bank" />
          </div>

          <label
            className="block text-gray-700 text-sm font-bold mt-4"
            htmlFor="documentType"
          >
            Tipo de documento
          </label>
          <Field
            className="bg-[#F6F6F6] shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="documentType"
            as="select"
          >
            <option value="0">Selecciona un tipo de documento</option>
            <option value="CC">Cédula de ciudadanía</option>
            <option value="NIT">Identificación tributaria</option>
            <option value="CE">Cédula de extranjería</option>
          </Field>
          <div className="text-red-600">
            <ErrorMessage name="documentType" />
          </div>

          <label
            className="block text-gray-700 text-sm font-bold mt-4"
            htmlFor="documentNumber"
          >
            Número de documento
          </label>
          <Field
            className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="documentNumber"
            type="tel"
          />
          <div className="text-red-600">
            <ErrorMessage name="documentNumber" />
          </div>

          <button
            className="bg-lime-600 customFont text-white mt-4 w-full py-2 px-3"
            type="submit"
          >
            {isLoading ? <>PROCESANDO...</> : <>ACEPTAR</>}
          </button>
        </Form>
      </Formik>
    </>
  );
};
