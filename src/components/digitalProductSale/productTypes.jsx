import React, { useState, useEffect } from 'react';
import { getTypes } from '../../services/digitalProducts';
import { useNavigate } from 'react-router-dom';

function ProductTypes() {

  const navigate = useNavigate()
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTypes_();
  }, []);

  const getTypes_ = async () => {
    setTypes(await getTypes());
  };

  const handleClick = (props) => {
    navigate('/productType/'+props.code)
  };

  const Card = ({ type }) => {
    return (
      <div className="flex flex-col hover:bg-[#fcb900] text-[#28367B] px-3 py-2 rounded-md text-sm font-bold rounded-lg  items-center overflow-hidden p-3">
        <img
          onClick={() => handleClick(type)}
          src={type.imageUrl}
          alt={type.description}
          height="30px"
          className='block w-20 h-auto'
        />
        <p>{type.description}</p>
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-3">

        {types.map((type) =>
          <Card
            key={type.code}
            type={type}
          />
        )}
      </div>
    </>
  );

}

export default ProductTypes

