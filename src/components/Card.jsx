import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos";


export const Card = ({ product }) => {
    const [lowestPrice, setLowestPrice] = useState();

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {

        var productWithLowestPrice = product.variants.reduce((lowest, current) => {
            const lowestPrice = parseFloat(lowest.price);
            const currentPrice = parseFloat(current.price);

            return currentPrice < lowestPrice ? current : lowest;
        });

        setLowestPrice(productWithLowestPrice['price']);
    }, [product]);


    return (
        <Link to={`/detail/${product.id}`} state={{ product }} className="product-card" data-aos-delay="0" data-aos-duration="500" data-aos="fade-up">
            {product.image ? (
                <img src={product.image['src']} alt={product.image['alt']} />
            ) :
                <img src="No_Image_Available.jpg" alt="No_Image_Available" />
            }

            <h2>{product.title}</h2>
            <span>Precio: {lowestPrice} €</span>
            <div>Más info ➞</div>
        </Link>
    )
}
