import { useState } from "react";
import { NavBar } from "../NavBar";
import { RechargeResultCard } from "../RechargeResultCard";
import { FormPse } from "./FormPse";


export const PseRecharge = () => {
    const [formData, setFormData] = useState({})
    const [page, setPage] = useState(0);
    const components = [
    <FormPse formData={formData} setFormData={setFormData} page={page} setPage={setPage}/>,
    <RechargeResultCard formData={formData} page={page} setPage={setPage} />,
  ];
  return (
    <>
      <NavBar name={'PSE'} page={page} setPage={setPage}/>
      {components[page]}
    </>
  )
}
