import './index.css';
import { MainRoute } from './router/MainRoute.js';
import { ProviderContext } from './context/ProviderContext';
import { useState,useEffect } from 'react';


function App() {
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
    <div className="App">
      

      <ProviderContext.Provider value={{products}}>
        <MainRoute/>
        {
          products.length < 1 && <img className='loading' src="loading.gif"></img>
        }
      </ProviderContext.Provider>
    </div>
  );
}

export default App;
