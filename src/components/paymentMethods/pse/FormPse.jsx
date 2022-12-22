import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ReactLoading from "react-loading";
import cookie from "js-cookie";
import * as Yup from "yup";
import {
  getPseBanks,
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


  const createPseOrder = async(values) => {
    const requestData = {
        type: formData.type,
        subType: formData.subType,
        productId: formData.productCode,
        reference: formData.customerCellphone,
        value: formData.productValue,
        paymentMethod: 21,
        paymentToken: "29568",
        productData: {},
        paymentData: {
          userType: values.personType-1,
          bank: values.bank,
          providerDescription: banks[values.bank].bankName,
          docType:values.documentType,
          docNumber:values.documentNumber,
      }
    }
    setIsLoading(true);
    const resp = await createOrder(requestData);
    setIsLoading(false);

    if(resp.success) {
      cookie.set('order', JSON.stringify(resp), {
        path: "/"
      });
      window.location.replace(resp.data.RedirectUrl)
    } else{
      setAlertMessage(resp.message);
      setStateModal(true);
    }
  }
  useEffect(() => {
    getBank();
  }, []);

  const handleKeyPress = (e) => {
    var code = e.which ? e.which : e.keyCode;
    if (code != 13) {
      if (e.target.value.length >= 10) {
        e.preventDefault(e.validate);
      }
      if (code < 48 || code > 57) {
        e.preventDefault(e.validate);
      }
    }
  };

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
          personType: "",
          bank: "",
          documentType: "",
          documentNumber: "",
        }}
        validationSchema={Yup.object({
          personType: Yup.string().required("Campo obligatorio"),
          bank: Yup.string().required("Campo obligatorio"),
          documentType: Yup.string().required("Campo obligatorio"),
          documentNumber: Yup.number()
            .max(9999999999, "Se deben ingresar 10 caracteres")
            .required("Campo obligatorio"),
        })}
        onSubmit={async (values) => {
          createPseOrder(values);
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
            Tipo de persona
          </label>
          <Field
            className="bg-[#F6F6F6] shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="personType"
            as="select"
          >
            <option value={0}>
                Seleccione un tipo de persona
              </option>
              <option value={1}>
                Persona natural
              </option>
              <option value={2}>
                Persona jurídica
              </option>
          </Field>
          <div className="text-red-600">
            <ErrorMessage name="personType" />
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
            onKeyPress={handleKeyPress}
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
