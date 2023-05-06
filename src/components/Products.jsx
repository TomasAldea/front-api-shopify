import React, { useState, useEffect } from 'react';
import { Card } from './Card';

export const Products = () => {
    const [products, setProducts] = useState([]);

    async function fetchData() {
        const result = await fetch('https://api-shopify-gamma.vercel.app/api/products');
        const { data } = await result.json();
        setProducts(data.products);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='mdl-products'>
            <h1 className='grid-title'>Products list</h1>
            {
                products.length < 1 && <img className='loading' src="loading.gif"></img>
            }
            <div className="product-grid">
                {products.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        </section>
    )
}
