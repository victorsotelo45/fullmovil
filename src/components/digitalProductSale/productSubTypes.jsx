import React, { useState, useEffect } from 'react';
import { getSubTypes } from '../../services/digitalProducts'
import './styles.css';


function ProductSubTypes({ page, setPage, formData, setFormData }) {

  console.log("FormData"+JSON.stringify(formData));

  const [subTypes, setSubTypes] = useState([]);

  useEffect(() => {
    getSubtypes();
  }, [formData.type]);

  const getSubtypes = async () => {
    setSubTypes(await getSubTypes(formData.type));
  };

  const handleClick = (props) => {

    console.log("clicked SubType " + JSON.stringify(props))
    const { code, description, imageUrl } = props;

    setFormData({
      ...formData,
      subType: code,
      subTypeDescription: description,
      subTypeImageUrl: imageUrl,
    })
    setPage(page + 1)
  };

  const SubTypeCard = ({ subType }) => {
    return (
      <div className="flex flex-col shadow-lg rounded-lg bg-white items-center overflow-hidden p-3 cursor-pointer hover:shadow-xl hover:z-10 active:shadow">
        <img
          onClick={() => handleClick(subType)}
          src={subType.imageUrl}
          alt={subType.description}
          height="30px"
          className='block w-20 h-auto'
        />
        <p>{subType.description}</p>
      </div>
    );
  };

  return (
    <>
      <p className="text-[#28367B] font-['Roboto', Sans-serif] font-extrabold md:text-2xl tracking-tight leading-snug mb-4 text-left">Proveedor</p>
      <div className="flex flex-row flex-wrap justify-center gap-3">

        {subTypes.map((subType) =>
          <SubTypeCard
            key={subType.code}
            subType={subType}
          />
        )}
      </div>
    </>
  );

}

export default ProductSubTypes

