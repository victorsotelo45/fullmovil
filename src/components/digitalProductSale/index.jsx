import ProductSubTypes from "./productSubTypes";
import ProductList from "./productList";
import Checkout from "./checkout";
import { useState, useEffect } from "react";
import "./styles.css";
import {CardPayment} from "../CardPayment";
import { Stepper, Step, StepButton } from "@mui/material";
import { getProducts, getType } from "../../services/digitalProducts";
import { PaymentValidate } from "./PaymentValidate";
import { Route, Routes, useNavigate } from "react-router-dom";
import { FormPse } from "../paymentMethods/pse/FormPse";
import cookie from "js-cookie";

function DigitalProductSale({ params }) {
  const [page, setPage] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // ...JSON.parse(cookie.get('formData')),
    type: params.typeCode,
    typeDescription: "",
    typeImageUrl: "",
    coverImageUrl: "",
    subType: params.subType,
    subTypeDescription: "",
    subTypeImageUrl: "",
    productCode: "",
    productDescription: "",
    productImageUrl: "",
    productValue: 0,
    paymentCode: "",
    paymentDescription: "",
    paymentImageUrl: "",
    paymentId: "",
    digitalProductOrderId: "",
    customerMail: "",
    customerCellphone: "",
    customerPaymentMethod: 0,
    paymentMethodDescription: "",
    country: "",
    countryCode: "",
    countryImageUrl: "",
    cardNumber: "",
    cardUserName: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const clear = () => {
    setFormData({
      ...formData,
      customerMail: "",
      customerCellphone: "",
      cardNumber: "",
      cardUserName: "",
      cardExpiry: "",
      cardCvc: "",
    });
  };
  // const getproduct = async (type, subType) => {
  //   const products = await getProducts(type, subType);
  //   const { code, description, value, imageUrl }  = products.find(element=>element == params.subType)
  //   setFormData({
  //     ...formData,
  //     productCode: code,
  //     productDescription: description,
  //     productValue: value,
  //     productImageUrl: imageUrl,
  //   });
  //   // setIsLoading(false);
  //   // setProducts(products);
  // };
// console.log(params.subType)
//   useEffect(() => {
//     if(params.subType){
//       params.subType != formData.subType && getproduct(); 
//       setPage(1);
//     }
//   }, [])
  

  useEffect(() => {
    gettype();
    setPage(0);
  }, [params.typeCode]);


  useEffect(() => {
    cookie.set("formData", JSON.stringify(formData), {
      path: "/",
    });
  }, [formData]);

  // useEffect(() => {
  //   console.log(params);
  //   if (params.subType) {
  //     if (params.checkout) {
  //       setPage(2);
  //     } else {
  //       setPage(1);
  //     }
  //   } else {
  //     setPage(0);
  //   }
  // }, []);

  const gettype = async () => {
    const typeFound = await getType(params.typeCode);
    setFormData({
      ...formData,
      type: params.typeCode,
      typeDescription: typeFound.description,
      typeImageUrl: typeFound.ImageUrl,
      coverImageUrl: typeFound.coverImage,
    });
  };

  const PaymentMethod = () => {
    switch (formData.customerPaymentMethod) {
      case "1":
        return (
          <CardPayment
            formData={formData}
            setFormData={setFormData}
            setPage={setPage}
            page={page}
            setIsSuccess={setIsSuccess}
          />
        );
      case "2":
        return <FormPse formData={formData} setFormData={setFormData} />;
      default:
        break;
    }
  };

  const componentList = [
    <ProductSubTypes
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <ProductList
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <Checkout
      formData={formData}
      setFormData={setFormData}
      page={page}
      setPage={setPage}
    />,
    <PaymentMethod />,
    <PaymentValidate
      setPage={setPage}
      page={page}
      isSuccess={isSuccess}
      formData={formData}
      clear={clear}
    />,
  ];

  const steps = ["Proveedor", "Producto", "Detalle compra", "Pago"];

  return (
    <div>
      <header className="bg-white divide-y-0">
        <div className="max-w-7xl mx-auto py-0 px-0 sm:px-0 lg:px-0">
          <h1 className="text-3xl font-bold text-[#28367B]">
            {formData.typeDescription}!
          </h1>
        </div>
      </header>

      <div
        className="mr-2 ml-2 pr-3 pl-3 max-w-7xl sm:px-5 lg:px-12"
        style={{ fontFamily: "Arial" }}
      >
        <div className="lg:gap-x-10 lg:grid-cols-12 lg:gap-y-8 grid-cols-1 grid">
          <div className="lg:col-span-5 lg:block hidden">
            <img
              src={formData.coverImageUrl}
              className=" rounded-2xl object-cover"
            />
          </div>
          <div className="lg:col-span-7 pt-2 pr-2 pb-2 pl-2">
            <div id="Stepper" className="flex p-0 mb-2">
              <button
                className="h-full w-[5%]"
                onClick={() => {
                  if (page == 0 || (formData.type == 2 && page == 1)) {
                    navigate("/");
                  } else {
                    setPage(page - 1);
                  }
                }}
              >
                <svg
                  stroke="#001174"
                  fill="none"
                  width="20"
                  height="25"
                  strokeWidth={1.8}
                >
                  <polyline points="15 3, 3 13, 15 23"></polyline>
                </svg>
              </button>
              <Stepper className="w-full" activeStep={page} alternativeLabel>
                {steps.map((label, index) => (
                  <Step
                    key={label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "#001174",
                      },
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "#001174",
                      },
                    }}
                  >
                    <StepButton
                      color="inherit"
                      onClick={() => {
                        setPage(index);
                      }}
                    >
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
            </div>
            {/* <Routes>
              <Route
                path="/"
                element={
                  <ProductSubTypes
                    formData={formData}
                    setFormData={setFormData}
                    page={page}
                    setPage={setPage}
                  />
                }
              />
              <Route
                path="/:subType"
                element={
                  <ProductList
                    formData={formData}
                    setFormData={setFormData}
                    page={page}
                    setPage={setPage}
                  />
                }
              />
              <Route
                path="/:subType/checkout"
                element={
                  <Checkout
                    formData={formData}
                    setFormData={setFormData}
                    page={page}
                    setPage={setPage}
                  />
                }
              />
              <Route path="/paymentMethod" element={<PaymentMethod />} />
              <Route
                path="/payment/validate"
                element={
                  <PaymentValidate
                    setPage={setPage}
                    page={page}
                    isSuccess={isSuccess}
                    formData={formData}
                    clear={clear}
                  />
                }
              />
            </Routes>
            <Routes>
            <Route
                path="/checkout"
                element={
                  <Checkout
                    formData={formData}
                    setFormData={setFormData}
                    page={page}
                    setPage={setPage}
                  />
                }
              />
            </Routes> */}
            <div>{componentList[page]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DigitalProductSale;
