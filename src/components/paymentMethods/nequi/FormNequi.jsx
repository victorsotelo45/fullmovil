import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addPaymentSource } from "../../../services/paymentMethods";
import Swal from "sweetalert2";
import ReactLoading from "react-loading";

export const FormNequi = ({ page, setPage }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex z-10 justify-center items-center transition">
          <div className="bg-white opacity-30 fixed inset-0 z-20" />
          <ReactLoading
            type="spin"
            color="black"
            width={"12%"}
            className="z-30"
          />
        </div>
      )}
      <div className="flex justify-center mt-3">
        <div className="bg-lime-600 w-full max-w-sm text-white rounded-xl p-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-alert-circle mr-2 ml-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <div className="ml-2">
          <h2 className="flex justify-start customFont">Recuerda</h2>
          <p className="block text-sm font-medium">
            Debes aprobar tu cuenta en la app de nequi
          </p>
          </div>
          
        </div>
      </div>

      <div className="flex justify-center">
        <Formik
          initialValues={{
            name: "",
            cellphone: "",
            email: "",
            documentType: "",
            documentNumber: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            cellphone: Yup.number()
              .max(9999999999, "Must be 10 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            documentType: Yup.string().required("Required"),
            documentNumber: Yup.number()
              .max(9999999999, "Must be 10 characters or less")
              .required("Required"),
          })}
          onSubmit={async (values) => {
            const request = {
              phoneNumber: parseInt(values.cellphone),
            };
            setIsLoading(true);
            const resp = await addPaymentSource("nequi", request);
            setIsLoading(false);
            if (resp) {
              Swal.fire({
                title: "Éxito",
                text: resp.data.message,
                confirmButtonText: "De acuerdo",
                confirmButtonColor: "red",
                timer: 20000,
              });
              setPage(page - 1);
            } else {
              Swal.fire({
                title: "Error",
                confirmButtonText: "De acuerdo",
                text: "Lo sentimos no fue posible agregar la fuente de pago.\nVerifica los datos e intenta nuevamente",
                confirmButtonColor: "red",
                timer: 20000,
              });
            }
          }}
        >
          <Form className="w-full max-w-sm bg-white shadow-md rounded px-8 py-6 mb-4 mt-2">
            <label
              className="block text-gray-700 text-sm font-bold"
              htmlFor="name"
            >
              Nombre
            </label>
            <Field
              className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
            />
            <div className="text-red-600">
              <ErrorMessage name="name" />
            </div>

            <label
              className="block text-gray-700 text-sm font-bold mt-4"
              htmlFor="cellphone"
            >
              Celular asociado a nequi
            </label>
            <Field
              className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="cellphone"
              type="tel"
            />
            <div className="text-red-600">
              <ErrorMessage name="cellphone" />
            </div>

            <label
              className="block text-gray-700 text-sm font-bold mt-4"
              htmlFor="email"
            >
              Email asociado a nequi
            </label>
            <Field
              className="bg-[#F6F6F6] shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
            />
            <div className="text-red-600">
              <ErrorMessage name="email" />
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
              <option value="cc">Cédula de ciudadanía</option>
              <option value="it">Identificación tributaria</option>
              <option value="ce">Cédula de extranjería</option>
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
              {isLoading ? <>PROCESANDO...</> : <>VINCULAR</>}
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};
