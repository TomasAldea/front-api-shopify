import React, { useContext,useEffect } from 'react';
import { Card } from './Card';
import { ProviderContext } from '../context/ProviderContext';
import AOS from "aos";

export const Products = () => {
    const { products } = useContext(ProviderContext);

    useEffect(() => {
        AOS.init();
    }, [products])
    
    return (
        <section className='mdl-products' data-aos-delay="300" data-aos-duration="700" data-aos="fade-in">
            <h1 className='grid-title'>Listado de productos</h1>
            <div className="product-grid">
                {products.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        </section>
    )
}
