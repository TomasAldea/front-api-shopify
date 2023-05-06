import React, { useContext } from 'react';
import { Card } from './Card';
import { ProviderContext } from '../context/ProviderContext';

export const Products = () => {
    const { products } = useContext(ProviderContext);

    return (
        <section className='mdl-products'>
            <h1 className='grid-title'>Listado de productos</h1>
            {
                products && <img className='loading' src="loading.gif"></img>
            }
            <div className="product-grid">
                {products?.map((product, index) => (
                    <Card key={index} product={product} />
                ))}
            </div>
        </section>
    )
}
