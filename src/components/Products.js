import React, { useState, useEffect } from 'react';

export const Products = () => {
    const [data, setData] = useState([]);

    async function fetchData() {
        const result = await fetch('https://api-shopify-gamma.vercel.app/api/products');
        const { data } = await result.json();
        setData(data);
    }

    useEffect(() => {
        fetchData();
    }, []);
    console.log(data);

    return (
        <div>
            cards
        </div>
    )
}
