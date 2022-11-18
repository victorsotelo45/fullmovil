import React, { useState, useEffect } from 'react';
import { getPaymentMethods } from '../../services/paymentMethods'


function ProductList({ page, setPage, formData, setFormData }) {

    const [methods, setMethods] = useState([]);

    const getMethods = async () => {
        const methods = await getPaymentMethods();
        setMethods(methods);
    };

    useEffect(() => {
        getMethods();
    }, []);

    const handleClick = (props) => {

        console.log("clicked product " + props.code);
        const { code, description, value } = props;

        setFormData({
            ...formData,
            paymentCode: code,
            paymentDescription: description,
            paymentImageUrl: value,
        })
        setPage(page + 1)
    };

    const Product = ({ product }) => {

        return (
            <div className="list-group-item rounded-4 shadow mt-3"
                onClick={() => handleClick(product)}            >
                <img src={product.imageUrl} alt={product.description} height="50" />
                {product.description} &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>${product.value}</strong>
            </div>
        );
    };

    return (
        <>
            {
                <ul className="list-group">
                    {products.map((product) => (
                        <li key={product.code}>
                            <Product
                                product={product}
                            />
                        </li>
                    ))}
                </ul>
            }
        </>
    );

}

export default ProductList


