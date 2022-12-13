import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";

export const FormRecharge = ({ recharge, isLoading }) => {
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
      <Formik
        initialValues={{
          valueRecharge: "",
        }}
        validationSchema={Yup.object({
          valueRecharge: Yup.number()
            .max(9999999999, "Must be 10 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values) => {
          recharge(values.valueRecharge);
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
          <button
            className="bg-lime-600 customFont text-white mt-4 w-full py-2 px-3"
            type="submit"
          >
            {isLoading ? (
                  <>PROCESANDO...</>
                ) : (
                  <>GUARDAR DETALLE DE TARJETA</>
                )}
          </button>
        </Form>
      </Formik>
    </>
  );
};
