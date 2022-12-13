import { useState } from "react";
import { validatePaymentSource } from "../../services/paymentMethods";
import ReactLoading from "react-loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

export const ModalForm = ({
  cardNumber,
  sourcePayment,
  setStateModal,
  page,
  setPage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttemps] = useState(3);
  const validateValue = async (valueKey) => {
    const request = {
      sourcePayment: sourcePayment,
      validationKey: valueKey,
    };
    setIsLoading(true);
    const resp = await validatePaymentSource("card", request);
    setIsLoading(false);
    if (resp.success) {
      Swal.fire({
        title: "Éxito",
        text: resp.message,
        confirmButtonText: "De acuerdo",
        confirmButtonColor: "red",
        timer: 20000,
      });
      setStateModal(false);
      setPage(page - 1);
      //   setPage(page - 1);
    } else {
      Swal.fire({
        title: "Error",
        confirmButtonText: "De acuerdo",
        text: resp.message,
        confirmButtonColor: "red",
        timer: 5000,
      });
      setAttemps(resp.error.remainingAttempts);
      if (attempts == 1) {
        setStateModal(false);
        setPage(page - 1);
      }
    }
  };
  return (
    <div className="w-full md:max-w-md bg-white shadow-md rounded-t-3xl">
      <Formik
        initialValues={{
          validationValue: "",
        }}
        validationSchema={Yup.object({
          validationValue: Yup.number()
            .max(999, "Must be 3 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          validateValue(values.validationValue);
        }}
      >
        <Form className="bg-white px-8 py-6 mt-0">
          <h2 className="font-semibold">Un último paso</h2>
          <p>
            Ingresa el valor aleatorio que fue cobrado a la tarjeta terminada en{" "}
            {cardNumber.substr(-3)}
          </p>

          <Field
            className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="validationValue"
            type="tel"
          />
          <div className="text-red-600">
            <ErrorMessage name="validationValue" />
          </div>
          {attempts < 3 && (
            <p className="text-red-600">Te quedan {attempts} intentos</p>
          )}
          <button
            className="bg-lime-600 customFont text-white mt-4 w-full py-2 px-3"
            type="submit"
          >
            {isLoading ? <>PROCESANDO...</> : <>ACEPTAR</>}
          </button>
          <button
            className="customFont mt-4 w-full py-2 px-3"
            type="button"
            onClick={() => {
              setStateModal(false);
              setPage(page - 1);
            }}
          >
            Omitir
          </button>
        </Form>
      </Formik>
    </div>
  );
};
