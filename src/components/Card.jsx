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
        <div className="product-card" data-aos-delay="300" data-aos-duration="500" data-aos="fade-up">
            {product.image ? (
                <img src={product.image['src']} alt="Product Image" />
            ) :
                <img src="No_Image_Available.jpg" alt="Product Image" />
            }

            <h2>{product.title}</h2>
            <span>Price: {lowestPrice} €</span>
            <Link to={`/detail/${product.id}`} state={{ product }}>More info ➞</Link>
        </div>
    )
}
