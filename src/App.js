import './index.css';
import { MainRoute } from './router/MainRoute.js';
import { ProviderContext } from './context/ProviderContext';
import { useState, useEffect } from 'react';


function App() {
  const [products, setProducts] = useState([]);
  const [serverResponse, setServerResponse] = useState(false);

  async function fetchData() {
    const result = await fetch('https://api-shopify-gamma.vercel.app/api/products');

    const { data, status } = await result.json();

    if (status === 'success') {
      setProducts(data.products);
      setServerResponse(false);
    } else {
      const hideTitle = document.querySelector('.grid-title');
      hideTitle.style.display = 'none';
      setServerResponse(true);
    }

  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <ProviderContext.Provider value={{ products }}>
        <MainRoute />
        {(products.length < 1 && !serverResponse) && <img className='loading' src="loading.gif"></img>}
        {serverResponse && <div className='server-down'>Servicio temporalmente inactivo, prueba más tarde.</div>}
      </ProviderContext.Provider>
    </div>
  );
}

export default App;
