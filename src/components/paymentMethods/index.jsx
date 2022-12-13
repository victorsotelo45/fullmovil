import { useState } from "react";
import "./styles.css";
import { PaymentMethods } from "./PaymentMethods";
import { NequiRecharge } from "./nequi/NequiRecharge";
import { CreditCardRecharge } from "./CardPayment/CreditCardRecharge";
import { BancolombiaRecharge } from "./bancolombia/BancolombiaRecharge";
import { PseRecharge } from "./pse/PseRecharge";

function DigitalPayment() {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    imageUrl: "",
    paymentSource: {},
    transactionResponse: {},
  });

  const [isStartPage, setIsStartPage] = useState(true);

  const getComponent = () => {
    if (isStartPage) {
      return (
        <PaymentMethods
          setIsStartPage={setIsStartPage}
          formData={formData}
          setFormData={setFormData}
        />
      );
    }
    switch (formData.code) {
      case 101:
        return (
          <PseRecharge
            setIsStartPage={setIsStartPage}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 201:
        return (
          <CreditCardRecharge
            setIsStartPage={setIsStartPage}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 401:
        return (
          <BancolombiaRecharge
            setIsStartPage={setIsStartPage}
            formData={formData}
          />
        );
      case 402:
        return (
          <NequiRecharge
            setIsStartPage={setIsStartPage}
            formData={formData}
            setFormData={setFormData}
          />
        );
      default:
        return <p>Not found</p>;
    }
  };

  return (
    <div
      className="h-screen sm:px-5 lg:px-12 py-2 bg-[#F6F6F6] flex justify-center"
      style={{ fontFamily: "Arial" }}
    >
      <div className="w-full rounded-xl p-5 pt-2 md:max-w-md">
        {getComponent()}
      </div>
    </div>
  );
}

export default DigitalPayment;
