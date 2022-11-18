import React, { useState, useEffect } from "react";
import { getProducts } from "../../services/digitalProducts";

function ProductList({ page, setPage, formData, setFormData }) {
  const [products, setProducts] = useState([]);

  const getproducts = async (type, subType) => {
    const products = await getProducts(type, subType);
    setProducts(products);
  };

  useEffect(() => {
    getproducts(formData.type, formData.subType);
  }, []);

  const handleClick = (props) => {
    console.log("clicked product " + props.code);
    const { code, description, value, imageUrl } = props;

    setFormData({
      ...formData,
      productCode: code,
      productDescription: description,
      productValue: value,
      productImageUrl: imageUrl,
    });
    setPage(page + 1);
  };

  const ProductDetail = ({ product }) => {
    return (
      <>
        {/* Estilos por lista
                className="list-group-item rounded-2 shadow mt-1" */}
                {/* className="max-w-xs rounded-lg p-3 shadow-lg overflow-hidden grid content-between justify-items-center w-1/4 min-w-[139px] cursor-pointer hover:shadow-xl hover:z-10 active:shadow" */}
        <div
          onClick={() => handleClick(product)}
          className="rounded-lg p-3 shadow-lg overflow-hidden grid content-between justify-items-center cursor-pointer hover:shadow-xl hover:z-10 active:shadow"
        >
          <div className="item-thumb">
            <img src={product.imageUrl} />
          </div>
          <div className="overflow-hidden w-full">
            <h5 className="text-center text-sm py-3  text-ellipsis overflow-hidden">
              {product.description}
            </h5>
          </div>
          <h5 className="flex justify-center font-bold">${product.value}</h5>
        </div>
      </>
    );
    /*
        return (
            <div onClick={() => handleClick(product)}
                className="list-group-item rounded-2 shadow mt-3">
                <img src={product.imageUrl} alt={product.description} height="50" />
                {product.description} &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>${product.value}</strong>
            </div>
        );
        */
  };

  return (
    <>
      <p className="text-[#28367B] font-['Roboto', Sans-serif] font-extrabold md:text-2xl tracking-tight leading-snug mb-4 text-left">
        Paquetes
      </p>
      {/* <div className="w-full flex flex-row flex-wrap justify-around gap-3 overflow-y-scroll max-h-[70vh]"> */}
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-scroll max-h-[70vh]">
        {products.map((product) => (
          <ProductDetail key={product.code} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
