import { stringify } from "postcss";
import { useState, useEffect, useRef } from "react";
import Summary from "./summary";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import cookie from "js-cookie";

const Checkout = ({ page, setPage, formData, setFormData }) => {
  const inputReference = useRef(null);
  const navigate = useNavigate();

  // A custom validation function. This must return an object
  // which keys are symmetrical to our values/initialValues
  const validate = (values) => {
    const errors = {};

    if (values.productValue == '') {
      errors.productValue = "campo obligatorio";
    } else if (values.productValue < 1000) {
      errors.productValue = "Valor inválido";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "campo obligatorio";
    } else if (values.phoneNumber.length !== 10) {
      errors.phoneNumber = "Número de celular inválido";
    }

    if (!values.email) {
      errors.email = "campo obligatorio";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Dirección de email inválida";
    }

    if (values.paymentMethod == 0) {
      errors.paymentMethod = "Seleccione método de pago";
    }

    return errors;
  };

  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      productValue: formData.productValue,
      phoneNumber: formData.customerCellphone,
      email: formData.customerMail,
      paymentMethod: formData.customerPaymentMethod,
    },
    validate,
    onSubmit: (values) => {
      setFormData({...formData, productValue: values.productValue, customerMail: values.email,
      customerCellphone: values.phoneNumber, customerPaymentMethod: values.paymentMethod})
      values.paymentMethod == 1 && setPage(page + 1);
      // navigate(`/payment?value=${values.productValue}&reference=WO0440400`);
      cookie.set('formData', JSON.stringify(formData), {
        path: "/"
      });
    },
  });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, customerCellphone: target.value });
  };

  const handleProductClick = () => {
    setPage(page - 1);
  };
  const handleSubTypeClick = () => {
    setPage(page - 2);
  };

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

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  return (
    <div className="w-full ">
      <p className="md:text-2xl text-[#28367B] font-['Roboto', Sans-serif] font-extrabold tracking-tight leading-snug mb-4 lg:mb-0 text-left">
        Finalizar
      </p>
      <form className="w-full max-w-full m-0" onSubmit={formik.handleSubmit}>
        <Summary
          page={page}
          setPage={setPage}
          formData={formData}
          setFormData={setFormData}
        />
        
        <div className="w-full mt-3 mr-auto mb-3 ml-auto lg:mb-0 lg:mt-2">
          <label className="block font-semibold text-sm text-gray-700">
            Valor
          </label>
          <div className="mt-1">
            <input
              type="tel"
              ref={inputReference}
              className='lg:h-[5vh] px-3 sm:text-sm h-10 w-full rounded-md shadow-sm border
            border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 focus:bg-white'
              placeholder="ingrese un valor"
              name="productValue"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.productValue}
              pattern="[0-9]{4,10}"
              required
              onKeyPress={handleKeyPress}
              disabled={formData.type!=2}
            />
            {formik.errors.productValue && formik.touched.productValue && (
              <div className="italic text-red-500">
                {formik.errors.productValue}
              </div>
            )}
          </div>
        </div>


        <div className="w-full mt-3 mr-auto mb-3 ml-auto lg:mb-0 lg:mt-2">
          <label className="block font-semibold text-sm text-gray-700">
            Celular
          </label>
          <div className="mt-1">
            <input
              type="tel"
              ref={formData.type!=2 ? inputReference : undefined}
              className="lg:h-[5vh] px-3 sm:text-sm h-10 w-full rounded-md shadow-sm border
            border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 focus:bg-white"
              placeholder="ingrese el numero
            celular"
              name="phoneNumber"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              pattern="[0-9]{10}"
              required
              onKeyPress={handleKeyPress}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="italic text-red-500">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
        </div>
        <div className="w-full mt-3 mr-auto mb-3 ml-auto lg:mb-0 lg:mt-2">
          <label className="block font-semibold text-sm text-gray-700">
            Correo
          </label>
          <div className="mt-1">
            <input
              type="email"
              className="lg:h-[5vh] px-3 sm:text-sm h-10 w-full rounded-md shadow-sm border
            border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 focus:bg-white"
              placeholder="correo@correo.com"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              required
            />
            {formik.errors.email && formik.touched.email && (
              <div className="italic text-red-500">{formik.errors.email}</div>
            )}
          </div>
        </div>
        <div className="w-full mt-3 mr-auto mb-3 ml-auto lg:mb-0 lg:mt-2">
          <label className="block font-semibold text-sm text-gray-700">
            Metodo Pago
          </label>
          <div>
            <select
              className="h-[5vh] mb-2 w-full rounded-md pr-6 pl-3 border text-gray-700 border-gray-300
            placeholder-gray-300 focus:shadow-outline cursor-pointer"
              style={{ fontFamily: "Arial" }}
              name="paymentMethod"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              defaultValue={formik.values.paymentMethod}
            >
              <option style={{ fontFamily: "Arial" }} value="0">
                Seleccione Método
              </option>
              <option style={{ fontFamily: "Arial" }} value="1">
                Tarjeta
              </option>
              <option style={{ fontFamily: "Arial" }} value="2">
                AirTm
              </option>
            </select>
            {formik.errors.paymentMethod && formik.touched.paymentMethod && (
              <div className="italic text-red-500">
                {formik.errors.paymentMethod}
              </div>
            )}
          </div>
        </div>
        <button
          className="w-full text-center text-xl font-semibold bg-gray-800 text-white pt-3 pr-3 pb-3 pl-3
        hover:bg-gray-600 rounded-md"
          style={{ fontFamily: "Arial" }}
          type="submit"
        >
          COMPRAR
        </button>
      </form>
    </div>
  );
};

export default Checkout;
