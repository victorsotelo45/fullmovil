import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactLoading from "react-loading";
import cookie from "js-cookie";
import * as Yup from "yup";
import {
  createTransaction,
  getPseBanks,
  rechargePse,
} from "../../../services/paymentMethods";
import { Modal } from "../Modal";
import { createOrder } from "../../../services/digitalProducts";

export const FormPse = ({ formData, setFormData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


  const getBank = async () => {
    const resp = await getPseBanks();
    setBanks(resp);
  };

  const createPseTransaction = async (values) => {
    const request = {
      userType: "0",
      bank: values.bank,
      providerDescription: banks[values.bank].bankName,
      value: formData.productValue,
      docType: values.documentType,
      docNumber: values.documentNumber,
      ip: "192.168.20.100",
    };
    const resp = await createTransaction("pse", request);
    return resp;
  };

  const createPseOrder = async() => {
    const request = {
        type: formData.type,
        subType: formData.subType,
        productId: formData.productCode,
        reference: formData.customerCellphone,
        value: formData.productValue,
        paymentMethod: 21,
        paymentToken: "29568",
        productData: {}
    }
    setIsLoading(true);
    const resp = await createOrder(request);
    setIsLoading(false);
    if(resp.success) {
      alert('orden creada correctamente')
      cookie.set('order', JSON.stringify(resp), {
        path: "/"
      });
      window.open(resp.RedirectUrl)
    } else{
      setAlertMessage(resp.message);
      setStateModal(true);
    }
  }
  useEffect(() => {
    getBank();
  }, []);

  return (
    <>
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
      {stateModal && <Modal text={alertMessage} setStateModal={setStateModal} />}
      <Formik
        initialValues={{
          bank: "",
          documentType: "",
          documentNumber: "",
        }}
        validationSchema={Yup.object({
          bank: Yup.string().required("Required"),
          documentType: Yup.string().required("Required"),
          documentNumber: Yup.number()
            .max(9999999999, "Must be 10 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          createPseOrder();
        }}
      >
        <Form className="w-full max-w-sm bg-white shadow-md rounded px-8 py-6 mb-4 mt-2">
          <h1 className="text-[#001174] text-xl">PSE</h1>
          <div className="block text-gray-800 font-bold mb-6 text-xl">
            Total a pagar: {formData.productValue}
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
